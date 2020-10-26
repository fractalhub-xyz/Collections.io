import { DEFAULT_COVER_IMAGE } from "./constants";

/**
 * Helper to ease including conditional classes
 * 1. cx() => ""
 * 2. cx("pha", "bet") => "pha bet"
 * 3. cx({ "pha": true, "bet": false, "cal": true }) => "pha cal"
 * 4. cx("ga", { "pha": true, "bet": false, "cal": true }) => "ga pha cal"
 */
export function cx(...args) {
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

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getCoverForCollection(collection) {
  const tags = collection.tags;
  let coverImg = DEFAULT_COVER_IMAGE;

  if (tags && tags.length) {
    const randomTag = tags[getRandomInt(tags.length)];
    const images = randomTag.image_urls.split(",");
    if (images.length) {
      coverImg = images[getRandomInt(images.length)];
    }
  }

  return {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${coverImg}) center / cover`,
  };
}
export function getCoverForTag(tag) {
  let coverImg = DEFAULT_COVER_IMAGE;

  const images = tag.image_urls.split(",");
  if (images.length) {
    coverImg = images[getRandomInt(images.length)];
  }

  return {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${coverImg}) center / cover`,
  };
}

export function setLen(len, total) {
  return {
    width: `calc(${(len / total) * 84}% + 4%)`,
  };
}

export function getImg(user) {
  if (!user.profile || !user.profile.avatar_in_base64) {
    return "";
  }
  let base = user.profile.avatar_in_base64;
  return base;
}