const React = require('react');

module.exports = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-8">
        <h2>A Visual Sketch: US Energy Composition Scenarios</h2>
        <small>By <a href="https://www.linkedin.com/in/daniel-lopuch-45a4447" target="_blank">Dan Lopuch</a> | <a href="https://twitter.com/floatrock" target="_blank">@floatrock</a></small>
        <p className="lead">
          A growing population demanding more energy, concerns about security of energy access, and the sustainability of the environment upon which we depend on for food and habitat are converging trends that will change the makeup and composition of our energy supply. This visualization project is an informal, work-in-progress sketch to better understand the nature of these trends and the models that predict various outcomes and opportunities.
        </p>
        <p>
          Modeling the makeup and effects of changes on an entire economy is complicated.  All models are simplifications, but simplifications can still reveal general trends and establish baselines from which more nuanced discussions can begin.  However, if a model is sufficiently complex, its conclusions may be comprehendible only to a limited highly-specialized group of experts, limiting public awareness of the problem or the opportunities inherit in possible interventions.
        </p>
        <p>
          This informal project is an experiment in using interactive data visualization and simulation techniques to make complex models more approachable.
        </p>
        <dl className="dl-horizontal">
          <dt>Intended Audience</dt>
          <dd>Visualization nerds interested in discussion how to present complex models, energy nerds interested in visualization discussions for their complex models</dd>
          <dt>Tech Stack</dt>
          <dd>d3, React, Redux, Bootstrap, Webpack</dd>
          <dt>Source Data</dt>
          <dd><a href="https://flowcharts.llnl.gov">LLNL Energy Flowcharts</a>, <a href="http://www.worldenergy.org/publications/2016/world-energy-scenarios-2016-the-grand-transition/">WEC World Energy Scenarios 2016</a></dd>
          <dt>Status</dt>
          <dd>Vastly incomplete work-in-progress with no formal verification.</dd>
          <dd><strong>This is merely a fun visualization exercise applied to a complex problem</strong>.</dd>
        </dl>


        <h3>Dense Predictions and Bullet-Point Reporting</h3>
        <p>
          Recently the UN-accredited global energy body, the World Energy Council, released a 138-page report describing effects of three possible public-policy paths on the makeup of the global energy supply, the ability to service the needs of a growing and industrializing global population, and the sustainability of the environment (including the ability to meet the goals set by the recent Paris climate talks).
        </p>
        <p>
          The report shines with the eyes-glazing-over rigor and uniform-color-palette polish one would expect from a UN body led by a team of Accenture consultants.
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
      <div className="col-md-6 col-md-offset-2">
        <blockquote className="blockquote-reverse">
          <footer>
            Example decontextualized statistics from The Guardian's <a href="https://www.theguardian.com/business/2016/oct/10/global-demand-for-energy-will-peak-in-2030-says-world-energy-council">"Global demand for energy will peak in 2030, says World Energy Council"</a>
          </footer>
        </blockquote>
      </div>
    </div>
    <div className="row">
      <div className="col-md-8">
        <p>
          A media summary is not expected to contain all the nuance of a full 138 page UN report, but if the point of the report was to describe how three different policy directions could interact with various global trends to shape energy markets and economic growth, that was all lost in favor of decontextualized bullet points.  We were presented numbers without an understanding of where they came from or what they predict in terms of economic change and development moving forward.
        </p>
        <p>
          This visualization is an experiment trying to see if at least part of this model can be communicated better.
        </p>
      </div>
    </div>
  </div>
);