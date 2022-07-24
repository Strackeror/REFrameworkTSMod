let f = sdk.find_type_definition("snow.data.AchievementDef").get_method("getAchievementNum")
sdk.hook(
  f,
  (args) => {
    let self = sdk.to_managed_object(args[1]);
    print(self.getAchievementNum());
    return sdk.PreHookresult.SKIP_ORIGINAL
  },
  (retval) => {
    return retval;
  }
);