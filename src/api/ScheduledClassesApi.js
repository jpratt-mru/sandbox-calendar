import { scheduledClasses } from "./scheduled-classes-data.js";

class ScheduledClassesApi {
  get classes() {
    return scheduledClasses;
  }
}

export default ScheduledClassesApi;
