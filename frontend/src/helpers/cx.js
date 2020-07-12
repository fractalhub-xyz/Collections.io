/**
 * Helper to ease including conditional classes
 * 1. cx() => ""
 * 2. cx("pha", "bet") => "pha bet"
 * 3. cx({ "pha": true, "bet": false, "cal": true }) => "pha cal"
 * 4. cx("ga", { "pha": true, "bet": false, "cal": true }) => "ga pha cal"
 */
export default function cx(...args) {
  if (!args.length) {
    return "";
  }

  const classObj = args.pop();
  if (typeof classObj !== "object") {
    return [...args, classObj];
  }

  const classes = args;
  Object.entries(classObj).forEach(([key, value]) => {
    value && key && classes.push(key);
  });

  return classes.join(" ");
}
