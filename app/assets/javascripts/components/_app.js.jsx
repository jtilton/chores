const App = React.createClass({
  getInitialState: function() {
    return {
      floors: this.props.floors,
      dateRange: this.props.initialDateRange,
      endDate: this.props.initialEndDate
    }
  },

  render: function() {
    return (
      <div>
        <DatePicker changeFloors={this.changeFloors}
                    dateRange={this.state.dateRange}
                    endDate={this.state.endDate}/>
        <Assignments floors={this.state.floors} />
      </div>
    );
  },

  changeFloors: function(click) {

    $.ajax({
      data: {
        click:click,
        previous_end_date:this.state.endDate
      },
      url: "/assignments",
      type: "GET",
      dataType: "json",
      success: function ( data ) {
        //this.setState({floors: data.floors});
        this.setState({endDate: data.end_date});
        this.setState({dateRange: data.date_range});
      }.bind(this)
    });

  }

});
