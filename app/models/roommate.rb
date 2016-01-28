class Roommate

  ASH = 0
  ANDY = 1
  BEN = 2
  CARLY = 3
  DANI = 4
  DAVID = 5
  JENN = 6
  KATE = 7
  KELLY = 8
  WILLIE = 9
  YU = 10

  NAMES = {
    ASH => "Ash Eldritch",
    ANDY => "Andy Donato",
    BEN => "Ben Kramer",
    CARLY => "Carly Lave",
    DANI => "Dani Servén",
    DAVID => "David Grunzweig",
    JENN => "Jenn Tilton",
    KATE => "Kate Bertelsen",
    KELLY => "Kelly Sousa",
    WILLIE => "Willie",
    YU => "Yu Wu",
  }

  FLOORS = {
    ASH => 2,
    ANDY => 1,
    BEN => 1,
    CARLY => 2,
    DANI => 2,
    DAVID => 2,
    JENN => 2,
    KATE => 1,
    KELLY => 2,
    WILLIE => 1,
    YU => 1,
  }

  attr_accessor :id, :first_name, :last_name

  def initialize(params)
    self.id = params[:id]
    self.first_name = params[:first_name]
    self.last_name = params[:last_name]
  end

  def task
    Mapping.where(:roommate_id => id).last.task_id
  end

  def current_mapping
    m = Mapping.where(:roommate_id => id).last
    {
      :id => m.id,
      :done => !!m.completed_at,
    }
  end

  def photo_path
    "#{first_name.downcase}.jpg"
  end

end
