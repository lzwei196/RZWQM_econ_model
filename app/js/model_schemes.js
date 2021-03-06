//all the parameters in per hectare

const project_general_info = {
  name: {
    type: String,
    unique: true,
    primary: true
  },
  country: String,
  city: String,
  longitude: String,
  duration: String,
  site: String,
  mitigation_methods: String,
  area: Number
};

const expected_lifetime = {
  name:{
    type:String,
    primary:true
  },
  year:Number
};

const production_cost = {
  caltivar_breed: {
    type: String,
    unique: true,
    primary: true
  },
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
  joint_plan: Number,
  tranport_to_crushing_plant:Number,
  pulverized:Number,
  roller:Number,
  stone_removal:Number,
  sowing_with_grain_drill:Number
};

const fixed_cost_parts = {
  project: {
    type: String,
    unique: true,
    primary: true
  },
  mitigation_practice_choice: String,
  pipe: Number,
  deep_well: Number,
  pump: Number,
  control_structure: Number,
  drainage_preparation: Number,
};

const carbon_tax_cal_QC = {
  year:{
    type:String,
    unique:true,
    primary:true
  },
  price:Number
}

const mitigation_choices = {
  name: String
};

module.exports = {
  production_cost: production_cost,
  fixed_cost_parts: fixed_cost_parts,
  mitigation_method_variables: mitigation_choices,
  project_general_info: project_general_info,
  expected_lifetime:expected_lifetime,
  carbon_tax_cal_QC:carbon_tax_cal_QC
};