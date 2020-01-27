//all the parameters in per hectare
class Project {
  constructor(name, date, location) {
    this.name = name;
    this.date = date;
    this.location = location;
  }
}
const production_cost = {
  caltivar_breed: { type: String, unique: true, primary: true },
  seed_price: Number,
  fertilizer_price: Number,
  spread_lime_price: Number,
  herbicides_price: Number,
  plow_price: Number,
  farmer_price: Number,
  farmer2_price: Number,
  fertilizer_application_price: Number,
  liquid_nitrogen_spreading_price: Number,
  seeder_price: Number,
  weeding_price: Number,
  spraying_price: Number,
  threshing_price: Number,
  transport_to_farm_price: Number,
  drying_on_farm_price: Number,
  storage_and_vantilation_price: Number,
  transport_top_regional_center_price: Number,
  joint_plan: Number
}

const fixed_cost_parts = {
  site: { type: String, unique: true, primary: true },
  pipe: Number,
  deep_well: Number,
  pump: Number,
  control_structure: Number,
  drainage_preparation: Number,
}

const mitigation_method_variables = {
  site: { type: String, unique: true, primary: true },
}
module.exports = {
  project: Project,
  production_cost: production_cost
};
