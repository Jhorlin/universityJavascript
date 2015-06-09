/**
 * Created by jhorlin.dearmas on 6/9/2015.
 */
(function (document, React, Rx, draw) {
    var boardOffset = 160;
    var Board = React.createClass({
        getInitialState: function () {
            return {
                height: document.body.clientHeight,
                width: document.body.clientWidth,
                paths: []
            };
        },
        componentDidMount: function () {
            var self = this,
                paths = [],
                path,
                subscription,
                node = React.findDOMNode(this)
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
                    path.points.push(point);
                    self.setState({
                        paths: paths,
                        height: self.state.height,
                        width: self.state.width
                    });
                };

            mouseDownSource.subscribe(function (e) {
                path = {
                    color: draw.color,
                    points: []
                };
                paths.push(path);
                console.log('setting subscriptions');
                subscription = mouseMoveSource.subscribe(mouseMoveSubscriber);
            });

            mouseUpSource.subscribe(function () {
                console.log('removing subscriptions')
                subscription.dispose();
                path = null;
            });

        },
        mousemoveHandler:function(){
            console.log('fucking move');
        },
        render: function () {
            var style = {
                    height: this.state.height - boardOffset,
                    width: this.state.width - 2,
                    position: 'absolute',
                    border: '1px solid blue',
                    left: 0
                },
                lines = this.state.paths.map(function (path, id) {
                    return (<Line key={id} color={path.color} points={path.points}/>)
                });
            return (<svg className="board" style={style}>{lines}</svg>)
        }
    })

    var Line = React.createClass({
        render: function () {
            var points = 'M ' + this.props.points.join(' L ');
            return (<path fill="none" className="line" strokeWidth="3" stroke={this.props.color} d={points} />)
        }
    })

    React.render(
        <Board />,
        document.getElementById('boardContainer')
    );
}(document, this.React, this.Rx, this.draw))