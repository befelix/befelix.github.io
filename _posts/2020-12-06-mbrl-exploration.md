---
layout: post
title:  "The need for Explicit Exploration in Model-based Reinforcement Learning"
author: "Sebastian Curi, Felix Berkenkamp, Andreas Krause"
javascript:
  - "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"
inline:
  - references
  - publications
css:
  - publications
---


In model-based reinforcement learning, we aim to optimize the expected performance of a policy in a stochastic
environment by learning a transition model that includes both epistemic (structural, decays with more data) 
and aleatoric (noise, independent of data) uncertainty.
When optimizing the policy, current algorithms typically average over both types of uncertainty. In this blog post,
we discuss problems with this approach and briefly discuss a tractable variant of optimistic exploration based on our upcoming [NeurIPS paper](/publications/#Curi2020OptimisticModel) {% cite Curi2020OptimisticModel -f personal %}.

<div>
  <b>If you want to discuss the following, please come to our NeurIPS poster on Tuesday.</b>
</div>
<br>

Model-based reinforcement learning
----------------------------------

In the following, we focus on deterministic policy and environments, and finite-horizon undiscounted RL for simplicity. Please see the paper for a more
general exposition. Given those assumptions the typical reinforcement learning objective is to optimize the cumulative $$r(s, a)$$ over environment
state trajectories of length $$N$$. For any dynamics $$f$$ this performance metric is given by

$$
\begin{align}
    J(f, \pi) =& \sum_{n=0}^{N} \, r(s_n, \pi(s_n)) \\
    &s_{n+1} = f(s_n, \pi(s_n) ) \\
    &a_n = \pi(s_n)
\end{align}
$$

and our goal is to find the policy that maximizes performance, that is

$$
\begin{equation}
    \pi^* = \mathrm{argmax}_{\pi} \, J(f, \pi).
\end{equation}
$$

To solve this problem, typical RL algorithms replace the unknown transition model $$f$$ by transition data samples from interactions with the environment. In model-based RL, we instead learn a model $$\tilde{f}$$ that approximates the true transition dynamics $$f$$. That is, at each episode $$t$$ we select a policy
$$ \pi_t $$ and collect new transition data by rolling out with $$\pi_t$$ on the true environment. Subsequently, we improve our model approximation $$\tilde{f}$$ based on the new data and repeat the process. The goal is to converge to a policy that maximizes the original problem $$J(f, \pi)$$, that is, we want $$\pi_t \to \pi^*$$.


Greedy Exploitation
------------------

A key challenge now lies in how to account for the fact that we have model errors, so that $$\tilde{f} \ne f$$. While it is possible to solve this problem with a best-fit approximation of the model to the data, the most data-efficient approaches learn *probabilistic* models of $$\tilde{f}$$ that explicitly represent uncertainty; be it through nonparemetric models such as Gaussian processes as in PILCO {% cite Deisenroth2015Pilco %} or ensembles of neural networks as in PETS {% cite Chua2018HandfulTrials %}. The end-result is a distribution of dynamics models $$p(\tilde{f})$$ that could potentially explain the transitions on the true environment observed so far.

Even though both PILCO and PETS represent uncertainty in their dynamics models, in the optimization step they average over the uncertainty in the environment,

$$
\begin{equation}
  \pi_t^{\mathrm{greedy}} = \mathrm{argmax}_\pi \, E_{\tilde{f} \sim p(\tilde{f})} \left[ J(\tilde{f}, \pi) \right].
\end{equation}
$$

That is, for episode $$t$$ $$\pi_t^{\mathrm{greedy}}$$ is the policy that achieves the maximal performance in expectation over the learned distribution of transition models $$p(\tilde{f})$$. This is a greedy scheme that exploits existing knowledge (best performance given current knowledge), but does not explicitly take exploration into account outside of special configurations of reward $$r$$ and dynamics $$f$$ (e.g., linear-quadratic control {% cite Mania2019Certainty %}). In fact, even with our restriction to deterministic dynamics $$f$$ in this blog post, this is a *stochastic* policy optimization scheme that effectively treats uncertainty about the transition dynamics similar to environment noise that we want to average over.

This can lead to peculiar behavior in practice. Consider the standard pendulum-swingup task with sparse rewards (we only get a reward when the pendulum is upright). In addition, we add a penalty on the norm of our actions, which is often desirable in terms of minimizing energy and jitter but also means that exploration comes at a cost. Now, during the first episode we collect random data, since we do not have any knowledge about the dynamics yet. Consequently, our learned model will have low uncertainty at the downwards position of the pendulum, but high uncertainty elsewhere in the state space. This is not a problem without action penalty, since there is still a marginal benefit to swinging up. Consequently, greedy exploitation solves that task independently of the model (DE=deterministic ensemble, PE=probabilistic ensemble, GP=Gaussian process):

<div class="row"><div class="mx-auto">
  <img 
    src="/assets/img/2020-12-06-inverted_pendulum_no_cost.jpg" 
    alt="Performance plot without action cost (greedy and optimistic work)"
    style="max-width: 100%;"
  />
</div></div>
<br>

However, once we add an action penality things change. Since $$\pi_t^\mathrm{greedy}$$ averages over model uncertainty, the expected cost of actuating the system and swinging up seems artificially high since many of the possible dynamics in $$p(\tilde{f})$$ need different control actions to stabilize at the top. In contrast, not actuating the system at all occurs zero penalty, which leads to a higher overall expected reward than actuating the system. Consequently, greedy exploration cannot solve the task. 


<div class="row"><div class="mx-auto">
  <img 
    src="/assets/img/2020-12-06-inverted_pendulum_cost.jpg" 
    alt="Performance plot without action cost (only optimistic exploration works)"
    style="max-width: 100%;"
  />
</div></div>
<br>

While we focused on this simple environment here, the paper shows that this behavior is consistent for more complex Mujoco environments too.


Optimistic Exploration
----------------------

To solve this problem, we have to explicitly explore and treat uncertainty as an opportunity, rather an adversary. We propose *H-UCRL* (Hallucinated-Upper Confidence RL), a practical optimistic exploration scheme that is both practical, so that it can be easily implemented within existing model-based RL frameworks, and has theoretical guarantees in the case of Gaussian process models. Instead of averaging over the state distribution imposed by the expectation in the greedy formulation, we instead consider acting optimistically within one-step transitions of our model. 

Conditioned on a particular state $$s$$, our belief over $$\tilde{f}$$ introduces a distribution over possible next states. In particular, we consider Gaussian distributions so that the next state is distributed as

$$p(s_{t+1} \,|\, s_t, a_t) \sim \mathcal{N}(\mu_t(s_t, a_t), \sigma_t(s_t, a_t)^2)$$

according to our model. Instead of averaging over these transitions, we propose an exploration scheme that acts optimistically within the confidence intervals over the subsequent states. To this end, we introduce an additional (hallucinated) action input with control authority proportional to the one-step model uncertainty $$\sigma(\cdot)$$, scaled by an appropriate constant $$\beta$$ to select a confidence interval (we set $$\beta=1$$ for all our experiments). If we assign a separate policy $$\eta$$ to this hallucinated action space that take values in $$[-1, 1]$$, this reduces the stochastic belief over the next state according to $$p(\tilde{f})$$ to the deterministic dynamics

$$s_{t+1} = \mu_t(s_t, a_t) + \beta \, \sigma_t(s_t, a_t) \, \eta(s_t)$$

We can visualize the difference between predictions according to samples from $$p(\tilde{f})$$ and the optimistic dynamics under $$\eta$$ below. For a given starting state $$s_0$$, the distribution over possible transition dynamics induces a wide state distribution (light gray). In the case of sparse rewards (red cross), only very few of these transitions can obtain a positive reward. This causes greedy exploitation with $$\pi_t^\mathrm{greedy}$$ to fail in the presence of action penalties. In contrast, H-UCRL can act optimistically within the one-step confidence intervals of our model (illustrated by vertical blue arrows within the dark gray area), so that the joint policies $$(\pi, \eta)$$ operate on a simpler, deterministic system that can be driven to the sparse reward exactly.

<div class="row"><div class="mx-auto">
  <img 
    src="/assets/img/2020-12-06-optimistic_predictions.jpg" 
    alt="Performance plot without action cost (only optimistic exploration works)"
    style="max-width: 100%;"
  />
</div></div>
<br>

Intuitively, $$(\pi, \eta)$$ turn the stochastic distribution $$p(\tilde{f})$$ into a simpler deterministic dynamic system that can be controlled easily (with large uncertainty $$\eta$$ can influence the states directly). Thus, we optimize the two policies jointly,

$$\pi_t^{\mathrm{H-UCRL}} = \mathrm{argmax}_\pi \max_\eta J(\tilde{f}, (\pi, \eta))$$ 

under the extended dynamics

$$\tilde{f}(s, (\pi, \eta)) = \mu_t(s, \pi(s)) + \beta \sigma_t(s, \pi(s)) \eta(s) ,$$

Note that while we optimize over $$\pi$$ and $$\eta$$ jointly, only $$\pi$$ is applied when collecting data on the true environment $$f$$. While the resulting $$\pi_t^{\mathrm{H-UCRL}}$$ will not solve the task on the true system initially, it will collect informative data and converges to the optimal policy as the uncertainty $$\sigma(\cdot)$$ in our model decreases (provably so in the case of Gaussian process models). At the same time, the optimistic formulation of H-UCRL fits into standard RL frameworks, where we just have a different dynamic system that includes an extended action space. This makes it easy to implement and [code is available](http://github.com/sebascuri/hucrl). Much more explanations and details can be found in the paper {% cite Curi2020OptimisticModel -f personal %}.


References
----------

{% bibliography --cited -f personal -f general %}
