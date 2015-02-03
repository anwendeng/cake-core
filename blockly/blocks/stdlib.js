'use strict';

goog.provide('Blockly.Blocks.stdlib');

goog.require('Blockly.Blocks');

Blockly.Blocks['library_stdlib_convert'] = {
    /**
     * Block for atoi(), atof()
     * @this Blockly.Block
     */
    init: function() {
        var OPERATORS =
            [
                [Blockly.Msg.STDLIB_CONVERT_INT, 'INT'],
                [Blockly.Msg.STDLIB_CONVERT_DOUBLE, 'DOUBLE']
            ];
        this.setHelpUrl(Blockly.Msg.STDLIB_CONVERT_HELPURL);
        this.setColour(300);
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.STDLIB_CONVERT_TITLE,
            ['VAR', null, Blockly.ALIGN_RIGHT],
            ['OPERATORS', new Blockly.FieldDropdown(OPERATORS)],
            Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.Msg.STDLIB_CONVERT_HELPURL);
    }
};

Blockly.Blocks['library_stdlib_rand'] = {
  /**
   * Block for [printf function] in c
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_PRINT_HELPURL);
    this.setColour(300);
    this.interpolateMsg(Blockly.Msg.STDLIB_RAND_TITLE,
                        ['TEXT', 'INBRACKET', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);

  },
  //when the block is changed, 
  onchange: Blockly.Blocks.requireInFunction
  
};

Blockly.Blocks['library_stdlib_malloc'] = {
  /**
   * Block for malloc()
   * @this Blockly.Block
   */
  init: function() {
      this.setHelpUrl(Blockly.Msg.STDLIB_MALLOC_HELPURL);
      this.setColour(300);
      this.setOutput(true, 'Pointer');
      this.interpolateMsg(Blockly.Msg.STDLIB_MALLOC_TITLE,
          ['VAR', null, Blockly.ALIGN_RIGHT],
          Blockly.ALIGN_RIGHT);
      this.setInputsInline(true);
      this.setTooltip(Blockly.Msg.STDLIB_MALLOC_TOOLTIP);
  },
  //when the block is changed, 
  onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks['library_stdlib_sizeof_forMalloc'] = {
    /**
     * Block for sizeof()
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_HELPURL);
        this.setColour(210);
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_TITLE,
            ['VAR', null, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.STDLIB_SIZEOFFORMALLOC_TOOLTIP);
    },
    //when the block is changed,
    onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks['library_stdlib_arithmetic_forMalloc'] = {
    /**
     * Block for basic arithmetic operator.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(230);
        this.setOutput(true, 'Number');
        this.interpolateMsg(Blockly.Msg.STDLIB_ARITHFORMALLOC_TITLE,
            ['A', null, Blockly.ALIGN_RIGHT],
            ['B', 'Number', Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY);
    },
    //when the block is changed,
    onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks['library_stdlib_number_forMalloc'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('1',
                Blockly.FieldTextInput.numberValidator), 'NUM');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    },
    //when the block is changed,
    onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks['library_stdlib_free'] = {
  /**
   * Block for free()
   * @this Blockly.Block
   */
      init: function() {
      this.setHelpUrl(Blockly.Msg.STDLIB_FREE_HELPURL);
      this.setColour(300);
      this.interpolateMsg(Blockly.Msg.STDLIB_FREE_TITLE,
          ['VAR', 'Pointer', Blockly.ALIGN_RIGHT],
          Blockly.ALIGN_RIGHT);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.Msg.STDLIB_FREE_TOOLTIP);
  },
  //when the block is changed,
  onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks['library_stdlib_exit'] = {
  /**
   * Block for exit()
   * @this Blockly.Block
   */
  init: function() {
      var OPERATORS =
          [
              [Blockly.Msg.STDLIB_EXIT_SUCCESS, 'SUCCESS'],
              [Blockly.Msg.STDLIB_EXIT_FAILURE, 'FAILURE']
          ];
      this.setHelpUrl(Blockly.Msg.STDLIB_EXIT_HELPURL);
      this.setColour(300);
      this.interpolateMsg(Blockly.Msg.STDLIB_EXIT_TITLE,
          ['OPERATORS', new Blockly.FieldDropdown(OPERATORS)],
          Blockly.ALIGN_RIGHT);
      this.setPreviousStatement(true);
      this.setTooltip(Blockly.Msg.STDLIB_EXIT_HELPURL);
  },
  //when the block is changed, 
  onchange: Blockly.Blocks.requireInFunction
};