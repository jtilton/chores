const ChoreCard = React.createClass({
  getInitialState: function() {
    return {
      done: this.props.card.done,
      details: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({done: nextProps.card.done});
  },

  render: function() {
    return (
      <div className="card">
        <div className="task" onClick={this.toggleDetails}>
          {this.props.card.task.name}
        </div>

        <div className="content">
          <p className={this.detailsClass()}>
            {this.props.card.task.details}
          </p>
          <div className={this.roommateClass()}>
            <img className="photo"
                 alt={this.props.card.roommate.first_name}
                 src={this.props.image_map[this.props.card.roommate.photo_path]}
            />
            <div className="name"> {this.props.card.roommate.first_name} </div>
          </div>
        </div>
        <div className={this.buttonClass()} onClick={this.markDone}></div>
      </div>
    );
  },

  markDone: function() {
    $.ajax({
      data: {_method:'PUT'},
      url: "/mappings/" + this.props.card.id,
      type: "POST",
      dataType: "json",
      success: function ( data ) {
        this.setState({done: !this.state.done});
      }.bind(this)
    });
  },

  toggleDetails: function() {
    this.setState({details: !this.state.details});
  },

  buttonClass: function() {
    return 'button ' + (this.state.done ? 'complete' : '');
  },

  detailsClass: function() {
    return 'details ' + (this.state.details ? '' : 'hidden');
  },

  roommateClass: function() {
    return 'roommate ' + (this.state.details ? 'hidden' : '');
  },
});
