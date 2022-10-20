/**
 * APIFunction: format
 * Given a string with tokens in the form ${token}, return a string
 *     with tokens replaced with properties from the given context
 *     object.  Represent a literal "${" by doubling it, e.g. "${${".
 *
 * Parameters:
 * template - {String} A string with tokens to be replaced.  A template
 *     has the form "literal ${token}" where the token will be replaced
 *     by the value of context["token"].
 * context - {Object} An optional object with properties corresponding
 *     to the tokens in the format string.  If no context is sent, the
 *     window object will be used.
 * args - {Array} Optional arguments to pass to any functions found in
 *     the context.  If a context property is a function, the token
 *     will be replaced by the return from the function called with
 *     these arguments.
 *
 * Returns:
 * {String} A string with tokens replaced from the context object.
 */
const tokenRegEx = /\$\{([\w.]+?)\}/g;

export default function stringFormat(template, context, args) {
  // Example matching: str=${foo.bar} -> match=foo.bar
  var replacer = function(str, match) {
    var replacement;

    // Loop through all subs. Example: ${a.b.c}
    // 0 -> replacement = context[a];
    // 1 -> replacement = context[a][b];
    // 2 -> replacement = context[a][b][c];
    var subs = match.split(/\.+/);
    for (var i = 0; i < subs.length; i++) {
      if (i == 0) {
        replacement = context;
      }

      replacement = replacement[subs[i]];
    }

    if (typeof replacement == 'function') {
      replacement = args ? replacement.apply(null, args) : replacement();
    }

    if (typeof replacement == 'undefined') {
      return 'undefined';
    } else {
      return replacement;
    }
  };

  return template.replace(tokenRegEx, replacer);
}
