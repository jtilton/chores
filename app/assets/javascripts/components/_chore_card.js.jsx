const ChoreCard = React.createClass({
  getInitialState: function() {
    return {
      done: this.props.roommate.mapping.done,
      details: false
    };
  },

  render: function() {
    return (
      <div className="card">
        <div className="task" onClick={this.toggleDetails}>
          {this.props.roommate.task.name}
        </div>

        <div className="content">
          <p className={this.detailsClass()}>
            {this.props.roommate.task.details}
          </p>
          <div className={this.roommateClass()}>
            <img className="photo" alt="" src={this.props.roommate.photo_path}>
            </img>
            <div className="name"> {this.props.roommate.first_name} </div>
          </div>
        </div>
        <div className={this.buttonClass()} onClick={this.markDone}></div>
      </div>
    );
  },

  markDone: function() {
    $.ajax({
      data: {_method:'PUT'},
      url: "/mappings/" + this.props.roommate.mapping.id,
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
