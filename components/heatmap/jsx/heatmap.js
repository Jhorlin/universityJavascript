/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function (window, React) {
    var HeatMap = React.createClass({
        handleResize: function () {
            var self = this;
            //if (this.timeout) {
            //    window.clearTimeout(this.timeout);
            //    this.timeout = null;
            //}
            //this.timeout = window.setTimeout(function () {
                self.setState({
                    height: document.body.clientHeight,
                    width: document.body.clientWidth,
                    interactions: self.state.interactions
                });
           // }, 0)

        },
        handleInteraction: function (e) {
            this.state.interactions.push(e);
            debugger;
            this.setState({
                height: this.state.height,
                width: this.state.width,
                interactions: this.state.interactions
            })
        },
        componentDidMount: function () {
            window.addEventListener('resize', this.handleResize);
            window.addEventListener('click', this.handleInteraction);
        },

        componentWillUnmount: function () {
            window.removeEventListener('resize', this.handleResize);
            window.removeEventListener('click', this.handleInteraction);
        },
        getInitialState: function () {
            return {
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                interactions: []
            };
        },
        render: function () {
            var style = {
                    height: this.state.height,
                    width: this.state.width
                },
                heatPoints = this.state.interactions.map(function (interaction, index) {
                    return (<Heat interaction={interaction} container={style} key={index}/>);
                })
            return (
                <svg height={this.state.height} width={this.state.width} style={style}
                     className="heatMap">{heatPoints}</svg>
            );
        }
    });

    var Heat = React.createClass({

        render: function () {
            var xPct = (this.props.container.x / this.props.clientX) + '%',
                yPct = (this.props.container.y / this.props.clientY) + '%';
            debugger;
            return (<circle fill="blue" fillOpacity="0.1" cx={xPct} cy={yPct} r="5"/>)
        }
    })

    React.render(
        <HeatMap />,
        document.getElementById('heatMapContainer')
    );
}(this, React))