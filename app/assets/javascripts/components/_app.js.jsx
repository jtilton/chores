const App = React.createClass({
  getInitialState: function() {
    return {
      groups: this.props.groups,
      dateRange: this.props.initialDateRange,
      endDate: this.props.initialEndDate
    }
  },

  render: function() {
    return (
      <div>
        <DatePicker changeDates={this.changeDates}
                    dateRange={this.state.dateRange}
                    endDate={this.state.endDate}/>
        <Assignments groups={this.state.groups} />
      </div>
    );
  },

  changeDates: function(click) {

    $.ajax({
      data: {
        click:click,
        previous_end_date:this.state.endDate
      },
      url: "/assignments",
      type: "GET",
      dataType: "json",
      success: function ( data ) {
        this.setState({groups: data.groups});
        this.setState({endDate: data.end_date});
        this.setState({dateRange: data.date_range});
      }.bind(this)
    });

  }

});
