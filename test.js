Inline Styles: [
    {
      element: '<p style="color: red">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem optio id et! Repudiandae illo possimus nihil nesciunt laudantium quae hic.</p>',
      styles: 'color: red'
    }
  ]
  Internal Styles: [
    '\n' +
      '\n' +
      '\n' +
      '.anchor {\n' +
      '    background-color: blueviolet;\n' +
      '    color: white;\n' +
      '    padding: 10px 20px;\n' +
      '    border: transparent;\n' +
      '    border-radius: 10px;\n' +
      '    text-transform: capitalize;\n' +
      '}\n'
  ]
  External Styles: [
    <ref *1> CSSStyleRule {
      parentRule: null,
      parentStyleSheet: CSSStyleSheet { parentStyleSheet: null, cssRules: [Array] },
      selectorText: '.header-title',
      style: CSSStyleDeclaration {
        '0': 'color',
        length: 1,
        parentRule: [Circular *1],
        _importants: [Object],
        __starts: 14,
        color: 'red'
      },
      __starts: 0,
      __ends: 33
    },
    <ref *2> CSSStyleRule {
      parentRule: null,
      parentStyleSheet: CSSStyleSheet { parentStyleSheet: null, cssRules: [Array] },
      selectorText: '.paragraph',
      style: CSSStyleDeclaration {
        '0': 'color',
        '1': 'line-height',
        '2': 'font-size',
        length: 3,
        parentRule: [Circular *2],
        _importants: [Object],
        __starts: 46,
        color: 'green',
        'line-height': '1.5',
        'font-size': '16px'
      },
      __starts: 35,
      __ends: 110
    },
    <ref *3> CSSStyleRule {
      parentRule: null,
      parentStyleSheet: CSSStyleSheet { parentStyleSheet: null, cssRules: [Array] },
      selectorText: '.btn',
      style: CSSStyleDeclaration {
        '0': 'background-color',
        '1': 'color',
        '2': 'padding',
        '3': 'border',
        '4': 'border-radius',
        '5': 'text-transform',
        length: 6,
        parentRule: [Circular *3],
        _importants: [Object],
        __starts: 117,
        'background-color': 'blueviolet',
        color: 'white',
        padding: '10px 20px',
        border: 'transparent',
        'border-radius': '10px',
        'text-transform': 'capitalize'
      },
      __starts: 112,
      __ends: 278
   