'use strict';

goog.provide('Blockly.cake.stdio');

goog.require('Blockly.cake');

Blockly.cake['library_stdio_printf'] = function(block) {
    // Print statement
    var argument = '';
    var typeCode = '';
    var inQutCode = '';
    var outQutCode = '';
    var code = '';

    for (var n = 0; n <= block.printAddCount_; n++) {
        argument = Blockly.cake.valueToCode(block, 'VAR' + n,
            Blockly.cake.ORDER_NONE) || '';

        var childConnection = block.inputList[n].connection;
        var childBlock = block.inputList[n].connection.targetBlock();

        if(childBlock){
            var childBlockType = childBlock.type;
            console.log(childBlockType);
            if(
                childBlockType == 'math_number' ||
                childBlockType == 'math_arithmetic' ||
                childBlockType == 'math_modulo' ||
                childBlockType == 'library_math_abs' ||
                childBlockType == 'library_math_trig' ||
                childBlockType == 'library_math_logs' ||
                childBlockType == 'library_math_pow' ||
                childBlockType == 'library_math_exp' ||
                childBlockType == 'library_math_sqrt' ||
                childBlockType == 'library_math_round' ||
                childBlockType == 'library_string_strlen' ||
                childBlockType == 'library_stdlib_rand' ||
                childBlockType == 'library_stdlib_number_forRandScope1' ||
                childBlockType == 'library_stdlib_number_forRandScope100' ||
                childBlockType == 'library_stdlib_sizeof_forMalloc' ||
                childBlockType == 'library_stdlib_arithmetic_forMalloc' ||
                childBlockType == 'library_stdlib_number_forMalloc')
            {
                inQutCode += '%d';
                outQutCode += ', ' + argument;
            }
            else if (childBlockType == 'library_string_strcat' ||
                childBlockType == 'library_string_strcpy' ||
                childBlockType == 'library_string_strcmp' )
            {
                inQutCode += '%s';
                outQutCode += ', ' + argument;
            }
            else if (childBlockType == 'library_stdlib_convert')
            {
                if (argument.indexOf('atoi(') != -1) {
                    inQutCode += '%d';
                } else if (argument.indexOf('atof(') != -1){
                    inQutCode += '%f';
                }
                outQutCode += ', ' + argument;
            }
            else if (childBlockType == 'variables_array_get')
            {
                var tempArgu1 = argument.split('[');

                typeCode = Blockly.cake.varTypeCheckInPrint(tempArgu1[0]);

                if (typeCode == '') {
                    inQutCode += argument;
                } else {
                    inQutCode += typeCode;
                    outQutCode += ', ' + argument;
                }
            }
            else if (childBlockType == 'variables_pointer_get')
            {
                inQutCode += '%p';
                outQutCode += ', ' + argument;
            }
            else if (childBlockType == 'variables_pointer_&')
            {
                if(childBlock.inputList[0].connection.targetBlock()){
                    argument = Blockly.cake.valueToCode(childBlock, 'VALUE', Blockly.cake.ORDER_NONE) || '';

                    inQutCode += '%p';
                    outQutCode += ', &' + argument;
                }
            }
            else if (childBlockType == 'variables_pointer_*')
            {
                if(childBlock.inputList[0].connection.targetBlock()){
                    argument = Blockly.cake.valueToCode(childBlock, 'VALUE', Blockly.cake.ORDER_NONE) || '';

                    typeCode = Blockly.cake.varTypeCheckInPrint(argument);

                    if (typeCode == '') {
                        inQutCode += argument;
                    } else {
                        inQutCode += typeCode;
                        outQutCode += ', *' + argument;
                    }
                }
            }
            else if (childBlockType == 'library_math_numcheck' ||
                childBlockType == 'library_math_numcompare' ||
                childBlockType == 'procedures_callreturn' ||
                childBlockType == 'logic_compare' ||
                childBlockType == 'logic_operation' ||
                childBlockType == 'logic_negate' ||
                childBlockType == 'logic_boolean' ||
                childBlockType == 'logic_null' ||
                childBlockType == 'logic_ternary' ||
                childBlockType == 'controls_switch' ||
                childBlockType == 'library_stdlib_rand_scope' ||
                childBlockType == 'library_stdlib_malloc')
            {
                if (childConnection.isSuperior()) {
                    childConnection.targetBlock().setParent(null);
                } else {
                    childConnection.sourceBlock_.setParent(null);
                }
                // Bump away.
                childConnection.sourceBlock_.bumpNeighbours_();
            }
            else
            {
                typeCode = Blockly.cake.varTypeCheckInPrint(argument);

                if (typeCode == '') {
                    inQutCode += argument;
                } else {
                    inQutCode += typeCode;
                    outQutCode += ', ' + argument;
                }
            }
        }
    } // for loop end

    if (outQutCode == ''){
        code = 'printf(\"' + inQutCode + '\");';
    } else {
        code = 'printf(\"' + inQutCode + '\"' + outQutCode + ');';
    }

    Blockly.cake.definitions_['include_cake_stdio'] =
        '#include <stdio.h>';
    return code + '\n';
};

Blockly.cake['library_stdio_text'] = function(block) {
    // Text value.
    var code = Blockly.cake.quote_(block.getFieldValue('TEXT'));
    if (block.getParent() && block.getParent().type == 'library_stdio_printf') {
        return [code, Blockly.cake.ORDER_ATOMIC];
    } else if (code.length == 1) {
        code = '\'' + code + '\'';
    } else {
        code = '\"' + code + '\"';
    }
    return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['library_stdio_newLine'] = function(block) {
    // new line block for '\n'
    var code = '\\n';
    return [code, Blockly.cake.ORDER_NONE];
};

Blockly.cake['library_stdio_scanf'] = function(block) {
    // Scan statement.
    var argument0 = Blockly.cake.valueToCode(block, 'TEXT',
            Blockly.cake.ORDER_NONE) || '\'\'';
    Blockly.cake.definitions_['include_cake_stdio'] =
        '#include <stdio.h>';
    return 'scanf(' + argument0 + ');\n';
};

Blockly.cake.varTypeCheckInPrint = function(varName) {
    var typeCode = '';
    var varList = Blockly.Variables.allVariables();
    for(var temp = 0 ; temp < varList.length ; temp++) {
        if (varName == varList[temp][2]) {
            var type = varList[temp][0];
            if (type == 'int') {
                typeCode = '%d';
            } else if (type == 'unsigned int') {
                typeCode = '%u';
            } else if (type == 'float') {
                typeCode = '%f';
            } else if (type == 'double') {
                typeCode = '%f';
            } else if (type == 'char') {
                typeCode = '%c';
            }
            return typeCode;
        }
    }
    return typeCode;
};
