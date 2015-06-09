/**
 * Created by jhorlin.dearmas on 6/9/2015.
 */
(function (document, React, Rx, Promise, draw) {
    "use strict";

    var boardOffset = 160

    //Chalk board component
    var Board = React.createClass({
        //set the initial state
        getInitialState: function () {
            return {
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                paths: []
            };
        },
        componentDidMount: function () {
            var self = this,
                pathPromise,
                subscription,
                node = React.findDOMNode(this),
                leftMouseButton = function (e) {
                    return e.which === 1;
                },
                preventDefault = function (e) {
                    e.preventDefault;
                    return e;
                },
                mouseDownSource = Rx.Observable.fromEvent(node, 'mousedown')
                    .map(preventDefault)
                    .filter(leftMouseButton),
                mouseUpSource = Rx.Observable.fromEvent(node, 'mouseup')
                    .map(preventDefault)
                    .filter(leftMouseButton),
                mouseMoveSource = Rx.Observable.fromEvent(node, 'mousemove')
                    .map(preventDefault)
                    .filter(leftMouseButton)
                    .filter(function (e) {
                        return e.which === 1;
                    }).map(function (e) {
                        return [e.clientX, e.clientY - boardOffset].join(' ')
                    }),
                mouseMoveSubscriber = function (point) {
                    pathPromise.then(function (index) {
                        draw.addPoint(index, point);
                    });
                };

            //watch for update to our domain object
            draw.observable.subscribe(function (paths) {
                //set the state for rendering
                self.setState({
                    paths: paths,
                    height: self.state.height,
                    width: self.state.width
                });
            })

            mouseDownSource.subscribe(function (e) {
                pathPromise = draw.addPath({
                    color: draw.color,
                    points: []
                });
                subscription = mouseMoveSource.subscribe(mouseMoveSubscriber);
            });

            mouseUpSource.subscribe(function () {
                pathPromise = null;
                subscription.dispose();
            });

        },
        render: function () {
            //Render our lines
            var style = {
                    height: this.state.height - boardOffset,
                    width: this.state.width - 2,
                    position: 'absolute',
                    border: '1px solid blue',
                    left: 0
                },
                lines = this.state.paths
                    .filter(function (path) {
                        debugger;
                        return path.points.length;
                    })
                    .map(function (path, id) {
                        return (<Line key={id} color={path.color} points={path.points}/>)
                    });
            return (<svg className="board" style={style}>{lines}</svg>)
        }
    })

    //draw a line
    var Line = React.createClass({
        render: function () {
            var points = 'M ' + this.props.points.join(' L ');
            return (<path fill="none" className="line" strokeWidth="3" stroke={this.props.color} d={points}/>)
        }
    })

    //bootstrap the element
    React.render(
        <Board />,
        document.getElementById('boardContainer')
    );
}(document, this.React, this.Rx, this.Promise, this.draw))