/**
 * Created by jhorlin.dearmas on 6/9/2015.
 */
(function (document, React, draw) {
    "use strict";

    var colorOptions = ['#ed7777', '#fad48b', '#f5f9ad', '#bcdf8a', '#94c0cc', '#f6f4f1'],
        radius = 20;
    draw.color = colorOptions[0];

    //load our Palette
    var Palette = React.createClass({
        getInitialState: function () {
            return {
                selected: draw.color
            }
        },
        select: function (color) {
            draw.color = color;
            this.setState({
                selected: draw.color
            })
        },
        render: function () {
            var self = this;
            var chalks = colorOptions.map(function (color, index) {
                var yOffset = radius,
                    xOffset = (radius * 2) + 5,
                    xPosotion = xOffset * (index + 1);
                return (<Chalk select={self.select} selected={color === self.state.selected} color={color} y={yOffset}
                               x={xPosotion} key={index}/>)
            })
            return (<svg className="Palette">{chalks}</svg>);
        }
    });

    var Chalk = React.createClass({
        handleClick: function (color) {
            this.props.select(color);
        },
        render: function () {
            return (<circle className="chalk" fillOpacity={this.props.selected ? 1 : 0.5}
                            onClick={this.handleClick.bind(this, this.props.color)} fill={this.props.color} r={radius}
                            cy={this.props.y} cx={this.props.x}/>)
        }
    });

    React.render(<Palette />, document.getElementById('paletteContainer'));

}(document, this.React, this.draw))