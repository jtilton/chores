const Assignments = React.createClass({
  render: function() {
    return (
      <div>
        {this.getGroups()}
      </div>
    );
  },

  getGroups: function() {
    return _.map(this.props.groups, function(g, i) {
      var label = "Floor " + (i+1);
      return ( <Group cards={g}
                      label={label} /> )
    });
  }
});
