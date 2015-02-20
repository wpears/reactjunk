var R = React;
var el = R.createElement;

var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      el('div', {className: "commentBox"},
        el('h1','Comments'),
        el(CommentList),
        el(CommentForm)
      )
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      el('div', {className: "commentList"},
        el(Comment,{author:"Pete Hunt"}, "This is one comment"),
        el(Comment,{author:"wyatt"}, "Another comment")
      )
    );
  }
});

var CommentForm= React.createClass({
  render: function() {
    return (
      el('div', {className: "commentForm"},
        "Hello, world! I am a CommentForm."
      )
    );
  }
});


React.render(
  el(CommentBox, null),
  document.getElementById('content')
);
