const React = require('react');

module.exports = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-8">
        <h2>A Visual Sketch: US Energy Composition Scenarios</h2>
        <p className="lead">
          Growing populations demanding more energy, concerns about security of energy access, and sustainability of
          the environment upon which we depend on for food and habitat will all conspire to change the makeup and
          composition of our energy supply. This visualization is an informal sketch to better understand the
          implications of these trends and the possible outcomes predicted by various models.
        </p>
        <p>
          Modeling the makeup and effects of changes on an entire economy is complicated.  All models are simplifications, but simplifications can still reveal general trends and establish baselines from which more nuanced discussions can start or more precise models can be refined from.  However, if a model is sufficiently complex, it’s conclusions may be comprehendible only to a select highly-specialized group of experts, limiting public awareness of the problem or the opportunities inherit in possible interventions.
        </p>
        <p>
          This informal project is an experiment in using interactive data visualization and simulation techniques to make complex models more approachable than a typical static report.  It is hoped a more intuitive understanding of the model’s predictions will be achieved by interacting with a live simulation of the model.
        </p>
        <p>
          Project Stats:
        </p>
        <dl className="dl-horizontal">
          <dt>Tech Stack</dt>
          <dd>d3, React, Redux, Bootstrap, Webpack</dd>
          <dt>Sources</dt>
          <dd>LLNL Flowcharts, WEC World Energy Scenarios 2016</dd>
          <dt>Inspirations</dt>
          <dd>BV's Technologist, d3-sankey</dd>
          <dt>Status</dt>
          <dd>Vastly incomplete work-in-progress with no formal verification.</dd>
          <dd><strong>This is a fun visualization exercise applied to a complex problem</strong>.</dd>
        </dl>


        <h3>Dense Predictions and Bullet-Point Reporting</h3>
        <p>
          Recently the UN-accredited global energy body, the World Energy Council, released a 138-page report describing effects of three possible public-policy paths on the makeup of the global energy supply, the ability to service the needs of a growing and industrializing global population, and the sustainability of the environment (including the ability to meet the goals set by the recent Paris climate talks).
        </p>
        <p>
          The report shines with the eye-glazing-over rigor and uniform-color-palette polish one would expect from a UN body led by a team of Accenture consultants.
        </p>
        <p>
          The reporting in the general media, however, fails to communicate the main ideas.  <a href="https://www.theguardian.com/business/2016/oct/10/global-demand-for-energy-will-peak-in-2030-says-world-energy-council">A typical media publication summarizing the report</a>, for example, is a collection of decontextualized numbers plucked from the executive summary:
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <blockquote>
          <p>
            Solar and wind accounted for 4% of power generation in 2014 but could supply up to 39% by 2060, while hydroelectric power and nuclear are also expected to grow.
          </p>
          <footer>
            “Up to”? Under what circumstances might they be less?
          </footer>
        </blockquote>
      </div>

      <div className="col-md-4">
        <blockquote className="blockquote-reverse">
          <p>
            The range of outcomes could see fossil fuels provide anything from 50% to 70% of energy by 2060
          </p>
          <footer>
            Is that good?  Where are we today?
          </footer>
        </blockquote>
      </div>

    </div>
    <div className="row">

      <div className="col-md-4">
        <blockquote>
          <p>
            Under two of the scenarios, oil production will peak in 2030 at between 94m barrels per day (bpd) and 103 mb/d, although the third scenario would see it peak and plateau at 104 m/bpd for a decade from 2040.
          </p>
          <footer>
            But what makes it plateau instead of peak and decline?
          </footer>
        </blockquote>
      </div>

      <div className="col-md-4">
        <blockquote className="blockquote-reverse">
          <p>
            Its predictions for carbon emissions vary wildly depending on the strength of efforts to tackle the problem, from a reduction of 61% by 2060 to a slight increase of 5%.
          </p>
          <footer>
            Is that enough to fulfill the promises set by the Paris climate talks?
          </footer>
        </blockquote>
      </div>
    </div>
    <div className="row">
      <div className="col-md-8">
        <p>
          Obviously a press summary is not expected to contain all the nuance of a full 138 page UN report, but if the point of the report was to describe how three different policy directions could interact with various global trends to shape energy markets and economic growth, that was all lost in favor of decontextualized bullet points.  We were presented numbers without an understanding of where they came from or what needs to happen to achieve them.
        </p>
        <p>
          This visualization is an experiment in communicating small parts of these models better.
        </p>
        <h3>Experiment 1: Interactive Composition Flows</h3>
        <p>
          TODO: LLNL Sankey Flowcharts, interpolations, model simulation.  Multiple-unit sankey.
        </p>
      </div>
    </div>
  </div>
);