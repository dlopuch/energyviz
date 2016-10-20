const React = require('react');

module.exports = (props) => (
  <div className="row">
    <div className="col-md-8">
      <h3>Experiment 1: Interactive Composition Flows</h3>
    </div>
    <div className="col-md-5">
      <p>
        This experiment takes the form of an information-dense visualization called a <a href="https://en.wikipedia.org/wiki/Sankey_diagram">Sankey diagram</a>. Lawrence Livermore National Laboratory <a href="https://flowcharts.llnl.gov">publishes annual charts</a> enumerating energy flow and CO2 emissions across primary sources and industries in the form of Sankey diagrams. These Sankey energy diagrams present a high density of information.  In a compact representation, we can see, for example:
      </p>
      <ul>
        <li>
          Both absolute and relative energy production across sources (columns in Sankey diagrams are often described as “vertical pie charts”)
        </li>
        <li>
          Relative energy demands across different industries
          (eg electricity generation creates the highest demand for energy)
        </li>
        <li>
          Flow of energy allocations across different industries
          (eg petroleum use is dominated by transportation, coal use is domination by electricity generation)
        </li>
      </ul>
    </div>
    <div className="col-md-3">
      <a href="https://flowcharts.llnl.gov/content/assets/images/energy/us/Energy_US_2015.png">
        <img src="https://flowcharts.llnl.gov/content/assets/images/energy/us/Energy_US_2015.png" style={{width: 400}}/>
      </a>
      <br/>
      <small>
        Source: Lawrence Livermore National Laboratory, Department of Energy
      </small>
    </div>
    <div className="col-md-8">
      <p>
        These factors make Sankey diagrams great summaries for something as complex as energy economies, but most examples show static data.  <strong>The goal of this experiment, however, is to show how the makeup of the energy economy <em>changes</em> under different scenarios so the magnitude of the changes and their relative effects can be understood at a glance.</strong>
      </p>
      <p>
        <strong>Prior Art.</strong> Sankey diagrams can be interactive in that <a href="http://bl.ocks.org/Neilos/584b9a5d44d5fe00f779">nodes can be rearranged</a>, but this is useful as an exploratory tool when the auto-generated layout is unclear.  They can be <a href="http://infocaptor.com/sankey-diagram-software.php">dynamically generated</a> with different data sets, but these generators focus on exploring a given data set, not how the layout changes across data sets (eg the transitions are sudden and the layout can change with different datasets’ scaling, making it difficult to follow the effects of applying a different model).
      </p>
      <p>
        <strong>A Model-based Sankey.</strong> This experiment presents a Sankey diagram that maintains a consistent structure but whose data values can scale by swapping out various models.  We can load data for five scenarios: <a href="https://flowcharts.llnl.gov/content/assets/images/charts/Energy/Energy_2014_United-States.png">LLNL’s 2014 US energy flow</a>, <a href="https://flowcharts.llnl.gov/content/assets/images/charts/Energy/Energy_2015_United-States.png">LLNL’s 2015 US energy flow</a>, and three energy interpolations based on the <a href="http://www.worldenergy.org/publications/2016/world-energy-scenarios-2016-the-grand-transition/">2016 WEC World Energy Scenarios report</a>. By making it easy to change the data rather than the structure of the Sankey diagram, the effects of the various scenario models can quickly be summarized and compared.
      </p>
      <p>
        <strong>A Multi-Unit Sankey.</strong>  A Sankey diagram traditionally shows the absolute and relative amounts and flows of a single unit of quantity (eg with energy, it would typically show the number of <a href="https://en.wikipedia.org/wiki/Quad_(unit)">quads</a> or TWh from energy sources to sinks).  However, key questions addressed in these models involve the effects on CO2 <em>emissions</em> for various energy scenarios.  An innovation presented here is a portion of the Sankey diagram can change to a second unit, emissions in Million Metric Tons of CO2, with a click of a button.&nbsp;
        {props.sankeySinkMode === 'energy' ?
          (<button className="btn btn-default btn-xs" onClick={props.onToggleEmissionsSinks}>
            <span className="glyphicon glyphicon-globe"> </span>&nbsp;Show Emissions
          </button>) :
          (<button className="btn btn-default btn-xs" onClick={props.onToggleEnergySinks}>
            <span className="glyphicon glyphicon-flash"> </span>&nbsp;Show Energy Waste
          </button>)
        }
        <strong>&nbsp;Thus, we can summarize <em>both</em> energy and emissions flow in the same diagram.</strong> The underlying model-based data generators also generate data for this second unit, so it too can be swapped out across various models.
      </p>
    </div>
  </div>
);
