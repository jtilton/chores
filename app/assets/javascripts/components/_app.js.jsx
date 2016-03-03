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
        <Navbar days_remaining={this.props.days_remaining}
                banner_text={this.props.banner_text}
                changeDates={this.changeDates} />
        <DatePicker changeDates={this.changeDates}
                    dateRange={this.state.dateRange}
                    endDate={this.state.endDate}/>
        <Assignments groups={this.state.groups}
                     group_labels={this.props.group_labels}
                     image_map={this.props.image_map}/>
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
