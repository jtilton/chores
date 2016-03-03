const Assignments = React.createClass({
  render: function() {
    return (
      <div>
        {this.getGroups()}
      </div>
    );
  },

  getGroups: function() {
    var groups = [];
    for (i = 0; i < this.props.groups.length; i++) {
      var label = this.props.group_labels[i];
      var cards = this.props.groups[i];
      groups.push(
        <Group cards={cards}
               label={label}
               image_map={this.props.image_map} />
      )
    }
    return groups;
  }
});
