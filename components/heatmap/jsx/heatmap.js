/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function (window, React) {
    var HeatMap = React.createClass({
        handleResize: function () {
            var self = this;
            if (this.timeout) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.timeout = window.setTimeout(function () {
                self.setState({
                    height: document.body.clientHeight,
                    width: document.body.clientWidth,
                    interactions: self.state.interactions
                });
            }, 3000)

        },
        handleInteraction: function (e) {
            this.state.interactions.push(e);
            this.setState({
                height: this.state.clientHeight,
                width: this.state.clientWidth,
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
                    return (<Heat x={interaction.clientX} y={interaction.clientY} key={index}/>);
                })
            return (
                <svg height={this.state.height} width={this.state.width} style={style}
                     className="heatMap">{heatPoints}</svg>
            );
        }
    });

    var Heat = React.createClass({
        render: function () {
            return (<g stroke="green" fill="white" stroke-width="5">
                <circle cx={this.props.x} cy={this.props.y} r="15"/>
            </g>)
        }
    })

    React.render(
        <HeatMap />,
        document.getElementById('heatMapContainer')
    );
}(this, React))