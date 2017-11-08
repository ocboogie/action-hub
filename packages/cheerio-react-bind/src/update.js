/**
 * @param {Object} $elem Cheerio element
 */
export default $elem => {
  if (!$elem.data) {
    throw TypeError("`$elem` is not a valid cheerio element");
  }
  const update = $elem.data("update");
  if (!update) {
    throw TypeError(
      "`$elem` has not been registered with a `CheerioReactBind`"
    );
  }
  update();
};
