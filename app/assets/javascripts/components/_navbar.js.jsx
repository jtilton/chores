const Navbar = React.createClass({
  render: function() {
    return (
      <div className="nav" onClick={this.changeDates}>
        <i className="ion ion-android-home home"
           onClick={this.changeDates}></i>
        <div className={this.bannerClass()}>{this.props.banner_text}</div>
      </div>
    );
  },

  bannerClass: function() {
    if (this.props.days_remaining > 2) {
      return "title";
    } else if (this.props.days_remaining > 0) {
      return "title orange";
    } else {
      return "title red";
    }
  },

  changeDates: function() {
    this.props.changeDates("home");
  },

});
