# A Visual Sketch: US Energy Composition Scenarios

This informal project is a series of experiments in using interactive 
data visualization and simulation techniques to make complex models more 
approachable, focusing on predictive models in the energy industry and
their economic implications.

| Project Summary | |
| --- | --- |
| **Intended Audience** | Visualization nerds interested in discussion how to present complex models, energy nerds interested in visualization discussions for their complex models |
| **Tech Stack** | d3, React, Redux, Bootstrap, Webpack |
| **Source Data** |LLNL Energy Flowcharts, WEC World Energy Scenarios 2016 |
| **Status** | Vastly incomplete work-in-progress with no formal verification. |

This is merely a fun visualization exercise applied to a complex problem.

[https://dlopuch.github.io/energyviz](https://dlopuch.github.io/energyviz)

# List of Experiments
1. [Interactive Energy Flow Sankey](https://dlopuch.github.io/energyviz#experiment1)
  - A d3 sankey implementation that supports model-based data generation nodes
  - Pluggable data models allow swapping of different data scenarios to see effects
    of different data (and data scales) on a constant structure
  - Also experiments with using multiple units on a single sankey to link
    energy with emissions implications.

## To Build
1. Install webpack: `npm install -g webpack`
1. Install dependencies: `npm install`
1. Build with webpack watch server: `$ webpack-dev-server`
1. Content served at [http://localhost:8080/](http://localhost:8080/)