function testingElements(elements) {
  var x = document.querySelectorAll(elements);
  var myarray = [];
  console.log("Number of Elements: " + x.length);
  var nodeNameValue = "";
  for (var el in x) {
    if (x[el] !== undefined && x[el] !== null) {
      //nodeNameValue = "Text Name"+ " = " + myarray[x[el].textContent || x[el].innerText || "unknown" ] ;
      var itemName = x[el].textContent || x[el].innerText;
      if (itemName) {
        myarray[itemName] = {};
        for (
          var j = 0,
            atts = x[el].attributes,
            n = atts != undefined ? atts.length : 0;
          j < n;
          j++
        ) {
          //nodeNameValue += atts[j].nodeName + " = " + atts[j].nodeValue + ";";
          myarray[itemName][atts[j].nodeName] = atts[j].nodeValue;
        }
        //nodeNameValue += cssPath(x[el]) + ";";
        myarray[itemName]["cssPath"] = cssPath(x[el]);
        //myarray.push(nodeNameValue);
      }
    }
  }
  console.log("Attributes of the Buttons: ");
  console.log(myarray);
  return;
}

function cssPath(el) {
  if (!(el instanceof Element)) return;
  var path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    var selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += "#" + el.id;
      path.unshift(selector);
      break;
    } else {
      var sib = el,
        nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() == selector) nth++;
      }
      if (nth != 1) selector += ":nth-of-type(" + nth + ")";
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(" > ");
}

testingElements("button, a");
