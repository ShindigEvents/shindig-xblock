/* Javascript for ShindigXBlock. */
function ShindigXBlock(runtime, element) {
    //TODO:  Get these values from the edX environment
    var shindig_defaults = {
        "institution": "Shindig University",
        "course": "Shindig 101",
        "customerServicePhone": "(800)888-8888",
        "customerServiceEmail": "help@shindigevents.com",
        "dummy": "dummy test value"
    };

    Modernizr.load({
        test : Modernizr.inputtypes && Modernizr.inputtypes.date,
        nope : [
            '//afarkas.github.io/webshim/js-webshim/minified/polyfiller.js',
            '//shindigevents.github.io/shindig-xblock/shindigwidget/static/css/webshim-overrides.css'
        ],
        callback: function(){
            if (!window.jQuery) {
                // Load jQuery from our local server
                // Inject it into the middle of our order of scripts to execute
                // even if other scripts are listed after this one, and are already
                // done loading.
                Modernizr.load('//code.jquery.com/jquery-1.11.1.min.js',
                               '//code.jquery.com/ui/1.10.4/jquery-ui.min.js');
            }
            window.setTimeout( function(){
                $.webshims.setOptions('waitReady', false);
                $.webshims.setOptions('forms-ext', {types: 'date'});
                $.webshims.polyfill('forms forms-ext');
            }, 4000);
        }
    });
    function dean_addEvent(element, type, handler) {
        if (element.addEventListener) element.addEventListener(type, handler, !1); else {
            handler.$$guid || (handler.$$guid = dean_addEvent.guid++), element.events || (element.events = {});
            var handlers = element.events[type];
            handlers || (handlers = element.events[type] = {}, element["on" + type] && (handlers[0] = element["on" + type])),
                handlers[handler.$$guid] = handler, element["on" + type] = handleEvent;
        }
    }

    function removeEvent(element, type, handler) {
        element.removeEventListener ? element.removeEventListener(type, handler, !1) : element.events && element.events[type] && delete element.events[type][handler.$$guid];
    }

    function handleEvent(event) {
        var returnValue = !0;
        event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
        var handlers = this.events[event.type];
        for (var i in handlers) this.$$handleEvent = handlers[i], this.$$handleEvent(event) === !1 && (returnValue = !1);
        return returnValue;
    }

    function fixEvent(event) {
        return event.preventDefault = fixEvent.preventDefault, event.stopPropagation = fixEvent.stopPropagation,
            event;
    }

    function setFilterGrid(id) {
        var ref_row, fObj, tbl = grabEBI(id);
        if (null != tbl && "table" == tbl.nodeName.toLowerCase()) {
            if (arguments.length > 1) for (var i = 0; i < arguments.length; i++) {
                var argtype = typeof arguments[i];
                switch (argtype.toLowerCase()) {
                    case "number":
                        ref_row = arguments[i];
                        break;

                    case "object":
                        fObj = arguments[i];
                }
            }
            void 0 == ref_row ? ref_row = 1 : ref_row += 1;
            var ncells = getCellsNb(id, ref_row);
            tbl.tf_ncells = ncells, void 0 == tbl.tf_ref_row && (tbl.tf_ref_row = ref_row),
                tbl.tf_Obj = fObj, hasGrid(id) || AddGrid(id);
        }
    }

    function AddGrid(id) {
        TblId.push(id);
        var inpclass, fltgrid, displayBtn, btntext, enterkey, modfilter_fn, display_allText, on_slcChange, displaynrows, totrows_text, btnreset, btnreset_text, sort_slc, displayPaging, pagingLength, displayLoader, load_text, exactMatch, alternateBgs, colOperation, rowVisibility, colWidth, bindScript, t = grabEBI(id), f = t.tf_Obj, n = t.tf_ncells;
        if (fltgrid = void 0 != f && 0 == f.grid ? !1 : !0, displayBtn = void 0 != f && 1 == f.btn ? !0 : !1,
            btntext = void 0 != f && void 0 != f.btn_text ? f.btn_text : "go", enterkey = void 0 != f && 0 == f.enter_key ? !1 : !0,
            modfilter_fn = void 0 != f && f.mod_filter_fn ? !0 : !1, display_allText = void 0 != f && void 0 != f.display_all_text ? f.display_all_text : "",
            on_slcChange = void 0 != f && 0 == f.on_change ? !1 : !0, displaynrows = void 0 != f && 1 == f.rows_counter ? !0 : !1,
            totrows_text = void 0 != f && void 0 != f.rows_counter_text ? f.rows_counter_text : "Displayed rows: ",
            btnreset = void 0 != f && 1 == f.btn_reset ? !0 : !1, btnreset_text = void 0 != f && void 0 != f.btn_reset_text ? f.btn_reset_text : "Reset",
            sort_slc = void 0 != f && 1 == f.sort_select ? !0 : !1, displayPaging = void 0 != f && 1 == f.paging ? !0 : !1,
            pagingLength = void 0 != f && void 0 != f.paging_length ? f.paging_length : 10,
            displayLoader = void 0 != f && 1 == f.loader ? !0 : !1, load_text = void 0 != f && void 0 != f.loader_text ? f.loader_text : "Loading...",
            exactMatch = void 0 != f && 1 == f.exact_match ? !0 : !1, alternateBgs = void 0 != f && 1 == f.alternate_rows ? !0 : !1,
            colOperation = void 0 != f && f.col_operation ? !0 : !1, rowVisibility = void 0 != f && f.rows_always_visible ? !0 : !1,
            colWidth = void 0 != f && f.col_width ? !0 : !1, bindScript = void 0 != f && f.bind_script ? !0 : !1,
            t.tf_fltGrid = fltgrid, t.tf_displayBtn = displayBtn, t.tf_btnText = btntext, t.tf_enterKey = enterkey,
            t.tf_isModfilter_fn = modfilter_fn, t.tf_display_allText = display_allText, t.tf_on_slcChange = on_slcChange,
            t.tf_rowsCounter = displaynrows, t.tf_rowsCounter_text = totrows_text, t.tf_btnReset = btnreset,
            t.tf_btnReset_text = btnreset_text, t.tf_sortSlc = sort_slc, t.tf_displayPaging = displayPaging,
            t.tf_pagingLength = pagingLength, t.tf_displayLoader = displayLoader, t.tf_loadText = load_text,
            t.tf_exactMatch = exactMatch, t.tf_alternateBgs = alternateBgs, t.tf_startPagingRow = 0,
            modfilter_fn && (t.tf_modfilter_fn = f.mod_filter_fn), fltgrid) {
            var fltrow = t.insertRow(0);
            fltrow.className = "fltrow";
            for (var i = 0; n > i; i++) {
                var fltcell = fltrow.insertCell(i);
                if (inpclass = i == n - 1 && 1 == displayBtn ? "flt_s" : "flt", void 0 == f || void 0 == f["col_" + i] || "none" == f["col_" + i]) {
                    var inptype;
                    inptype = void 0 == f || void 0 == f["col_" + i] ? "text" : "hidden";
                    var inp = createElm("input", [ "id", "flt" + i + "_" + id ], [ "type", inptype ], [ "class", inpclass ]);
                    inp.className = inpclass, fltcell.appendChild(inp), enterkey && (inp.onkeypress = DetectKey);
                } else if ("select" == f["col_" + i]) {
                    var slc = createElm("select", [ "id", "flt" + i + "_" + id ], [ "class", inpclass ]);
                    if (slc.className = inpclass, fltcell.appendChild(slc), PopulateOptions(id, i),
                        displayPaging) {
                        var args = new Array();
                        args.push(id), args.push(i), args.push(n), args.push(display_allText), args.push(sort_slc),
                            args.push(displayPaging), SlcArgs.push(args);
                    }
                    enterkey && (slc.onkeypress = DetectKey), on_slcChange && (slc.onchange = modfilter_fn ? f.mod_filter_fn : function() {
                        Filter(id);
                    });
                }
                if (i == n - 1 && 1 == displayBtn) {
                    var btn = createElm("input", [ "id", "btn" + i + "_" + id ], [ "type", "button" ], [ "value", btntext ], [ "class", "btnflt" ]);
                    btn.className = "btnflt", fltcell.appendChild(btn), btn.onclick = modfilter_fn ? f.mod_filter_fn : function() {
                        Filter(id);
                    };
                }
            }
        }
        if (displaynrows || btnreset || displayPaging || displayLoader) {
            var infdiv = createElm("div", [ "id", "inf_" + id ], [ "class", "inf" ]);
            if (infdiv.className = "inf", t.parentNode.insertBefore(infdiv, t), displaynrows) {
                var totrows, ldiv = createElm("div", [ "id", "ldiv_" + id ]);
                displaynrows ? ldiv.className = "ldiv" : ldiv.style.display = "none", totrows = displayPaging ? pagingLength : getRowsNb(id);
                var totrows_span = createElm("span", [ "id", "totrows_span_" + id ], [ "class", "tot" ]);
                totrows_span.className = "tot", totrows_span.appendChild(createText(totrows));
                var totrows_txt = createText(totrows_text);
                ldiv.appendChild(totrows_txt), ldiv.appendChild(totrows_span), infdiv.appendChild(ldiv);
            }
            if (displayLoader) {
                var loaddiv = createElm("div", [ "id", "load_" + id ], [ "class", "loader" ]);
                loaddiv.className = "loader", loaddiv.style.display = "none", loaddiv.appendChild(createText(load_text)),
                    infdiv.appendChild(loaddiv);
            }
            if (displayPaging) {
                var mdiv = createElm("div", [ "id", "mdiv_" + id ]);
                displayPaging ? mdiv.className = "mdiv" : mdiv.style.display = "none", infdiv.appendChild(mdiv);
                var start_row = t.tf_ref_row, row = grabTag(t, "tr"), nrows = row.length, npages = Math.ceil((nrows - start_row) / pagingLength), slcPages = createElm("select", [ "id", "slcPages_" + id ]);
                slcPages.onchange = function() {
                    displayLoader && showLoader(id, ""), t.tf_startPagingRow = this.value, GroupByPage(id),
                        displayLoader && showLoader(id, "none");
                };
                var pgspan = createElm("span", [ "id", "pgspan_" + id ]);
                grabEBI("mdiv_" + id).appendChild(createText(" Page ")), grabEBI("mdiv_" + id).appendChild(slcPages),
                    grabEBI("mdiv_" + id).appendChild(createText(" of ")), pgspan.appendChild(createText(npages + " ")),
                    grabEBI("mdiv_" + id).appendChild(pgspan);
                for (var j = start_row; nrows > j; j++) row[j].setAttribute("validRow", "true");
                setPagingInfo(id), displayLoader && showLoader(id, "none");
            }
            if (btnreset && fltgrid) {
                var rdiv = createElm("div", [ "id", "reset_" + id ]);
                btnreset ? rdiv.className = "rdiv" : rdiv.style.display = "none";
                var fltreset = createElm("a", [ "href", "javascript:clearFilters('" + id + "');Filter('" + id + "');" ]);
                fltreset.appendChild(createText(btnreset_text)), rdiv.appendChild(fltreset), infdiv.appendChild(rdiv);
            }
        }
        colWidth && (t.tf_colWidth = f.col_width, setColWidths(id)), alternateBgs && !displayPaging && setAlternateRows(id),
            colOperation && (t.tf_colOperation = f.col_operation, setColOperation(id)), rowVisibility && (t.tf_rowVisibility = f.rows_always_visible,
            displayPaging && setVisibleRows(id)), bindScript && (t.tf_bindScript = f.bind_script,
            void 0 != t.tf_bindScript && void 0 != t.tf_bindScript.target_fn && t.tf_bindScript.target_fn.call(null, id));
    }

    function PopulateOptions(id, cellIndex) {
        var t = grabEBI(id), ncells = t.tf_ncells, opt0txt = t.tf_display_allText, sort_opts = t.tf_sortSlc, start_row = (t.tf_displayPaging,
            t.tf_ref_row), row = grabTag(t, "tr"), OptArray = new Array(), optIndex = 0, currOpt = new Option(opt0txt, "", !1, !1);
        grabEBI("flt" + cellIndex + "_" + id).options[optIndex] = currOpt;
        for (var k = start_row; k < row.length; k++) {
            {
                var cell = getChildElms(row[k]).childNodes, nchilds = cell.length;
                row[k].getAttribute("paging");
            }
            if (nchilds == ncells) for (var j = 0; nchilds > j; j++) if (cellIndex == j) {
                var cell_data = getCellText(cell[j]), isMatched = !1;
                for (w in OptArray) cell_data == OptArray[w] && (isMatched = !0);
                isMatched || OptArray.push(cell_data);
            }
        }
        sort_opts && OptArray.sort();
        for (y in OptArray) {
            optIndex++;
            var currOpt = new Option(OptArray[y], OptArray[y], !1, !1);
            grabEBI("flt" + cellIndex + "_" + id).options[optIndex] = currOpt;
        }
    }

    function Filter(id) {
        showLoader(id, ""), SearchFlt = getFilters(id);
        var t = grabEBI(id);
        fprops = void 0 != t.tf_Obj ? t.tf_Obj : new Array();
        for (var SearchArgs = new Array(), ncells = getCellsNb(id), hiddenrows = (getRowsNb(id),
            0), ematch = t.tf_exactMatch, showPaging = t.tf_displayPaging, i = 0; i < SearchFlt.length; i++) SearchArgs.push(grabEBI(SearchFlt[i]).value.toLowerCase());
        for (var row = (t.tf_ref_row, grabTag(t, "tbody tr")), k = 0; k < row.length; k++) {
            "none" == row[k].style.display && (row[k].style.display = "");
            var cell = getChildElms(row[k]).childNodes, nchilds = cell.length;
            if (nchilds == ncells) {
                for (var cell_value = new Array(), occurence = new Array(), isRowValid = !0, j = 0; nchilds > j; j++) {
                    var cell_data = getCellText(cell[j]).toLowerCase();
                    if (cell_value.push(cell_data), "" != SearchArgs[j]) {
                        var num_cell_data = parseFloat(cell_data);
                        if (/<=/.test(SearchArgs[j]) && !isNaN(num_cell_data)) occurence[j] = num_cell_data <= parseFloat(SearchArgs[j].replace(/<=/, "")) ? !0 : !1; else if (/>=/.test(SearchArgs[j]) && !isNaN(num_cell_data)) occurence[j] = num_cell_data >= parseFloat(SearchArgs[j].replace(/>=/, "")) ? !0 : !1; else if (/</.test(SearchArgs[j]) && !isNaN(num_cell_data)) occurence[j] = num_cell_data < parseFloat(SearchArgs[j].replace(/</, "")) ? !0 : !1; else if (/>/.test(SearchArgs[j]) && !isNaN(num_cell_data)) occurence[j] = num_cell_data > parseFloat(SearchArgs[j].replace(/>/, "")) ? !0 : !1; else {
                            var regexp;
                            regexp = ematch || "select" == fprops["col_" + j] ? new RegExp("(^)" + regexpEscape(SearchArgs[j]) + "($)", "gi") : new RegExp(regexpEscape(SearchArgs[j]), "gi"),
                                occurence[j] = regexp.test(cell_data);
                        }
                    }
                }
                for (var z = 0; ncells > z; z++) "" == SearchArgs[z] || occurence[z] || (isRowValid = !1);
            }
            isRowValid ? (row[k].style.display = "", showPaging && row[k].setAttribute("validRow", "true")) : (row[k].style.display = "none",
                hiddenrows++, showPaging && row[k].setAttribute("validRow", "false"));
        }
        t.tf_nRows = parseInt(getRowsNb(id)) - hiddenrows, showPaging || applyFilterProps(id),
            showPaging && (t.tf_startPagingRow = 0, setPagingInfo(id));
    }

    function setPagingInfo(id) {
        for (var t = grabEBI(id), start_row = parseInt(t.tf_ref_row), pagelength = t.tf_pagingLength, row = grabTag(t, "tr"), mdiv = grabEBI("mdiv_" + id), slcPages = grabEBI("slcPages_" + id), pgspan = grabEBI("pgspan_" + id), nrows = 0, j = start_row; j < row.length; j++) "true" == row[j].getAttribute("validRow") && nrows++;
        var npg = Math.ceil(nrows / pagelength);
        if (pgspan.innerHTML = npg, slcPages.innerHTML = "", npg > 0) {
            mdiv.style.visibility = "visible";
            for (var z = 0; npg > z; z++) {
                var currOpt = new Option(z + 1, z * pagelength, !1, !1);
                slcPages.options[z] = currOpt;
            }
        } else mdiv.style.visibility = "hidden";
        GroupByPage(id);
    }

    function GroupByPage(id) {
        showLoader(id, "");
        for (var t = grabEBI(id), start_row = parseInt(t.tf_ref_row), pagelength = parseInt(t.tf_pagingLength), paging_start_row = parseInt(t.tf_startPagingRow), paging_end_row = paging_start_row + pagelength, row = grabTag(t, "tr"), nrows = 0, validRows = new Array(), j = start_row; j < row.length; j++) {
            var isRowValid = row[j].getAttribute("validRow");
            "true" == isRowValid && validRows.push(j);
        }
        for (h = 0; h < validRows.length; h++) h >= paging_start_row && paging_end_row > h ? (nrows++,
            row[validRows[h]].style.display = "") : row[validRows[h]].style.display = "none";
        t.tf_nRows = parseInt(nrows), applyFilterProps(id);
    }

    function applyFilterProps(id) {
        t = grabEBI(id);
        var rowsCounter = t.tf_rowsCounter, nRows = t.tf_nRows, rowVisibility = t.tf_rowVisibility, alternateRows = t.tf_alternateBgs, colOperation = t.tf_colOperation;
        rowsCounter && showRowsCounter(id, parseInt(nRows)), rowVisibility && setVisibleRows(id),
            alternateRows && setAlternateRows(id), colOperation && setColOperation(id), showLoader(id, "none");
    }

    function hasGrid(id) {
        var r = !1, t = grabEBI(id);
        if (null != t && "table" == t.nodeName.toLowerCase()) for (i in TblId) id == TblId[i] && (r = !0);
        return r;
    }

    function getCellsNb(id, nrow) {
        var tr, t = grabEBI(id);
        tr = void 0 == nrow ? grabTag(t, "tr")[0] : grabTag(t, "tbody tr")[nrow];
        var n = getChildElms(tr);
        return n.childNodes.length;
    }

    function getRowsNb(id) {
        var t = grabEBI(id), s = t.tf_ref_row, ntrs = grabTag(t, "tr").length;
        return parseInt(ntrs - s);
    }

    function getFilters(id) {
        var SearchFltId = new Array(), t = grabEBI(id), tr = grabTag(t, "tr")[0], enfants = tr.childNodes;
        if (t.tf_fltGrid) for (var i = 0; i < enfants.length; i++) SearchFltId.push(enfants[i].firstChild.getAttribute("id"));
        return SearchFltId;
    }

    function clearFilters(id) {
        SearchFlt = getFilters(id);
        for (i in SearchFlt) grabEBI(SearchFlt[i]).value = "";
    }

    function showLoader(id, p) {
        var loader = grabEBI("load_" + id);
        null != loader && "none" == p ? setTimeout("grabEBI('load_" + id + "').style.display = '" + p + "'", 150) : null != loader && "none" != p && (loader.style.display = p);
    }

    function showRowsCounter(id, p) {
        var totrows = grabEBI("totrows_span_" + id);
        null != totrows && "span" == totrows.nodeName.toLowerCase() && (totrows.innerHTML = p);
    }

    function getChildElms(n) {
        if (1 == n.nodeType) {
            for (var enfants = n.childNodes, i = 0; i < enfants.length; i++) {
                var child = enfants[i];
                3 == child.nodeType && n.removeChild(child);
            }
            return n;
        }
    }

    function getCellText(n) {
        for (var s = "", enfants = n.childNodes, i = 0; i < enfants.length; i++) {
            var child = enfants[i];
            s += 3 == child.nodeType ? child.data : getCellText(child);
        }
        return s;
    }

    function getColValues(id, colindex, num) {
        for (var t = grabEBI(id), row = grabTag(t, "tr"), nrows = row.length, start_row = parseInt(t.tf_ref_row), ncells = getCellsNb(id, start_row), colValues = new Array(), i = start_row; nrows > i; i++) {
            var cell = getChildElms(row[i]).childNodes, nchilds = cell.length;
            if (nchilds == ncells) for (var j = 0; nchilds > j; j++) if (j == colindex && "" == row[i].style.display) {
                var cell_data = getCellText(cell[j]).toLowerCase();
                colValues.push(num ? parseFloat(cell_data) : cell_data);
            }
        }
        return colValues;
    }

    function setColWidths(id) {
        if (hasGrid(id)) {
            var t = grabEBI(id);
            t.style.tableLayout = "fixed";
            for (var colWidth = t.tf_colWidth, start_row = parseInt(t.tf_ref_row), row = grabTag(t, "tr")[0], ncells = getCellsNb(id, start_row), i = 0; i < colWidth.length; i++) for (var k = 0; ncells > k; k++) cell = row.childNodes[k],
                k == i && (cell.style.width = colWidth[i]);
        }
    }

    function setVisibleRows(id) {
        if (hasGrid(id)) for (var t = grabEBI(id), row = grabTag(t, "tr"), nrows = row.length, showPaging = t.tf_displayPaging, visibleRows = t.tf_rowVisibility, i = 0; i < visibleRows.length; i++) visibleRows[i] <= nrows && (showPaging && row[visibleRows[i]].setAttribute("validRow", "true"),
            row[visibleRows[i]].style.display = "");
    }

    function setAlternateRows(id) {
        if (hasGrid(id)) {
            for (var t = grabEBI(id), row = grabTag(t, "tr"), nrows = row.length, start_row = parseInt(t.tf_ref_row), visiblerows = new Array(), i = start_row; nrows > i; i++) "" == row[i].style.display && visiblerows.push(i);
            for (var j = 0; j < visiblerows.length; j++) row[visiblerows[j]].className = j % 2 == 0 ? "even" : "odd";
        }
    }

    function setColOperation(id) {
        if (hasGrid(id)) {
            var t = grabEBI(id), labelId = t.tf_colOperation.id, colIndex = t.tf_colOperation.col, operation = t.tf_colOperation.operation, outputType = t.tf_colOperation.write_method, precision = 2;
            if ("object" == (typeof labelId).toLowerCase() && "object" == (typeof colIndex).toLowerCase() && "object" == (typeof operation).toLowerCase()) {
                for (var row = grabTag(t, "tr"), start_row = (row.length, parseInt(t.tf_ref_row)), colvalues = (getCellsNb(id, start_row),
                    new Array()), k = 0; k < colIndex.length; k++) colvalues.push(getColValues(id, colIndex[k], !0));
                for (var i = 0; i < colvalues.length; i++) {
                    for (var result = 0, nbvalues = 0, j = 0; j < colvalues[i].length; j++) {
                        var cvalue = colvalues[i][j];
                        if (!isNaN(cvalue)) switch (operation[i].toLowerCase()) {
                            case "sum":
                                result += parseFloat(cvalue);
                                break;

                            case "mean":
                                nbvalues++, result += parseFloat(cvalue);
                        }
                    }
                    switch (operation[i].toLowerCase()) {
                        case "mean":
                            result /= nbvalues;
                    }
                    if (void 0 != outputType && "object" == (typeof outputType).toLowerCase()) {
                        if (result = result.toFixed(precision), void 0 != grabEBI(labelId[i])) switch (outputType[i].toLowerCase()) {
                            case "innerhtml":
                                grabEBI(labelId[i]).innerHTML = result;
                                break;

                            case "setvalue":
                                grabEBI(labelId[i]).value = result;
                                break;

                            case "createtextnode":
                                var oldnode = grabEBI(labelId[i]).firstChild, txtnode = createText(result);
                                grabEBI(labelId[i]).replaceChild(txtnode, oldnode);
                        }
                    } else try {
                        grabEBI(labelId[i]).innerHTML = result.toFixed(precision);
                    } catch (e) {}
                }
            }
        }
    }

    function grabEBI(id) {
        return document.getElementById(id);
    }

    function grabTag(obj, tagname) {
        return obj.querySelectorAll(tagname);
    }

    function regexpEscape(s) {
        function escape(e) {
            a = new RegExp("\\" + e, "g"), s = s.replace(a, "\\" + e);
        }
        chars = new Array("\\", "[", "^", "$", ".", "|", "?", "*", "+", "(", ")");
        for (e in chars) escape(chars[e]);
        return s;
    }

    function createElm(elm) {
        var el = document.createElement(elm);
        if (arguments.length > 1) for (var i = 0; i < arguments.length; i++) {
            var argtype = typeof arguments[i];
            switch (argtype.toLowerCase()) {
                case "object":
                    2 == arguments[i].length && el.setAttribute(arguments[i][0], arguments[i][1]);
            }
        }
        return el;
    }

    function createText(node) {
        return document.createTextNode(node);
    }

    function DetectKey(e) {
        var evt = e ? e : window.event ? window.event : null;
        if (evt) {
            var key = evt.charCode ? evt.charCode : evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
            if ("13" == key) {
                var cid, leftstr, tblid;
                cid = this.getAttribute("id"), leftstr = this.getAttribute("id").split("_")[0],
                    tblid = cid.substring(leftstr.length + 1, cid.length), t = grabEBI(tblid), t.tf_isModfilter_fn ? t.tf_modfilter_fn.call() : Filter(tblid);
            }
        }
    }

    function importScript(scriptName, scriptPath) {
        for (var isImported = !1, scripts = grabTag(document, "script"), i = 0; i < scripts.length; i++) if (scripts[i].src.match(scriptPath)) {
            isImported = !0;
            break;
        }
        if (!isImported) {
            var head = grabTag(document, "head")[0], extScript = createElm("script", [ "id", scriptName ], [ "type", "text/javascript" ], [ "src", scriptPath ]);
            head.appendChild(extScript);
        }
    }

    function TF_GetFilterIds() {
        try {
            return TblId;
        } catch (e) {
            alert("TF_GetFilterIds() fn: could not retrieve any ids");
        }
    }

    function TF_HasGrid(id) {
        return hasGrid(id);
    }

    function TF_GetFilters(id) {
        try {
            var flts = getFilters(id);
            return flts;
        } catch (e) {
            alert("TF_GetFilters() fn: table id not found");
        }
    }

    function TF_GetStartRow(id) {
        try {
            var t = grabEBI(id);
            return t.tf_ref_row;
        } catch (e) {
            alert("TF_GetStartRow() fn: table id not found");
        }
    }

    function TF_GetColValues(id, colindex, num) {
        return hasGrid(id) ? getColValues(id, colindex, num) : void alert("TF_GetColValues() fn: table id not found");
    }

    function TF_Filter(id) {
        grabEBI(id);
        TF_HasGrid(id) ? Filter(id) : alert("TF_Filter() fn: table id not found");
    }

    function TF_RemoveFilterGrid(id) {
        if (TF_HasGrid(id)) {
            var t = grabEBI(id);
            clearFilters(id), null != grabEBI("inf_" + id) && t.parentNode.removeChild(t.previousSibling);
            for (var row = grabTag(t, "tr"), j = 0; j < row.length; j++) {
                row[j].style.display = "";
                try {
                    row[j].hasAttribute("validRow") && row[j].removeAttribute("validRow");
                } catch (e) {
                    for (var x = 0; x < row[j].attributes.length; x++) "validrow" == row[j].attributes[x].nodeName.toLowerCase() && row[j].removeAttribute("validRow");
                }
            }
            if (t.tf_alternateBgs) for (var k = 0; k < row.length; k++) row[k].className = "";
            t.tf_fltGrid && t.deleteRow(0);
            for (i in TblId) id == TblId[i] && TblId.splice(i, 1);
        } else alert("TF_RemoveFilterGrid() fn: table id not found");
    }

    function TF_ClearFilters(id) {
        TF_HasGrid(id) ? clearFilters(id) : alert("TF_ClearFilters() fn: table id not found");
    }

    function TF_SetFilterValue(id, index, searcharg) {
        if (TF_HasGrid(id)) {
            var flts = getFilters(id);
            for (i in flts) i == index && (grabEBI(flts[i]).value = searcharg);
        } else alert("TF_SetFilterValue() fn: table id not found");
    }

    function setAutoComplete(id) {
        function initAutoComplete() {
            for (var filters = TF_GetFilters(id), i = 0; i < filters.length; i++) colValues.push("input" == grabEBI(filters[i]).nodeName.toLowerCase() ? getColValues(id, i) : "");
            try {
                actb(grabEBI(filters[0]), colValues[0]);
            } catch (e) {
                alert(scriptPath + " script may not be loaded");
            }
        }
        var t = grabEBI(id), bindScript = t.tf_bindScript, scriptPath = (bindScript.name,
            bindScript.path);
        initAutoComplete();
    }

    var JSONP = function() {
        function load(url, pfnError) {
            var script = document.createElement("script"), done = !1;
            script.src = url, script.async = !0;
            var errorHandler = pfnError || config.error;
            "function" == typeof errorHandler && (script.onerror = function(ex) {
                errorHandler({
                    url: url,
                    event: ex
                });
            }), script.onload = script.onreadystatechange = function() {
                done || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (done = !0,
                    script.onload = script.onreadystatechange = null, script && script.parentNode && script.parentNode.removeChild(script));
            }, head || (head = document.getElementsByTagName("head")[0]), head.appendChild(script);
        }
        function encode(str) {
            return encodeURIComponent(str);
        }
        function jsonp(url, params, callback, callbackName) {
            var key, query = -1 === (url || "").indexOf("?") ? "?" : "&";
            callbackName = callbackName || config.callbackName || "callback";
            var uniqueName = callbackName + "_json" + ++counter;
            params = params || {};
            for (key in params) params.hasOwnProperty(key) && (query += encode(key) + "=" + encode(params[key]) + "&");
            return window[uniqueName] = function(data) {
                callback(data);
                try {
                    delete window[uniqueName];
                } catch (e) {}
                window[uniqueName] = null;
            }, load(url + query + callbackName + "=" + uniqueName), uniqueName;
        }
        function setDefaults(obj) {
            config = obj;
        }
        var head, counter = 0, window = this, config = {};
        return {
            get: jsonp,
            init: setDefaults
        };
    }(), stIsIE = !1;

    if (sorttable = {
        init: function() {
            arguments.callee.done || (arguments.callee.done = !0, _timer && clearInterval(_timer),
                document.createElement && document.getElementsByTagName && (sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/,
                forEach(document.getElementsByTagName("table"), function(table) {
                    -1 != table.className.search(/\bsortable\b/) && sorttable.makeSortable(table);
                })));
        },
        makeSortable: function(table) {
            if (0 == table.getElementsByTagName("thead").length && (the = document.createElement("thead"),
                the.appendChild(table.rows[0]), table.insertBefore(the, table.firstChild)), null == table.tHead && (table.tHead = table.getElementsByTagName("thead")[0]),
                1 == table.tHead.rows.length) {
                sortbottomrows = [];
                for (var i = 0; i < table.rows.length; i++) -1 != table.rows[i].className.search(/\bsortbottom\b/) && (sortbottomrows[sortbottomrows.length] = table.rows[i]);
                if (sortbottomrows) {
                    null == table.tFoot && (tfo = document.createElement("tfoot"), table.appendChild(tfo));
                    for (var i = 0; i < sortbottomrows.length; i++) tfo.appendChild(sortbottomrows[i]);
                    delete sortbottomrows;
                }
                headrow = table.tHead.rows[0].cells;
                for (var i = 0; i < headrow.length; i++) headrow[i].className.match(/\bsorttable_nosort\b/) || (mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/),
                    mtch && (override = mtch[1]), headrow[i].sorttable_sortfunction = mtch && "function" == typeof sorttable["sort_" + override] ? sorttable["sort_" + override] : sorttable.guessType(table, i),
                    headrow[i].sorttable_columnindex = i, headrow[i].sorttable_tbody = table.tBodies[0],
                    dean_addEvent(headrow[i], "click", sorttable.innerSortFunction = function() {
                        if (-1 != this.className.search(/\bsorttable_sorted\b/)) return sorttable.reverse(this.sorttable_tbody),
                            this.className = this.className.replace("sorttable_sorted", "sorttable_sorted_reverse"),
                            this.removeChild(document.getElementById("sorttable_sortfwdind")), sortrevind = document.createElement("span"),
                            sortrevind.id = "sorttable_sortrevind", sortrevind.innerHTML = stIsIE ? '&nbsp<font face="webdings">5</font>' : "&nbsp;&#x25B4;",
                            void this.appendChild(sortrevind);
                        if (-1 != this.className.search(/\bsorttable_sorted_reverse\b/)) return sorttable.reverse(this.sorttable_tbody),
                            this.className = this.className.replace("sorttable_sorted_reverse", "sorttable_sorted"),
                            this.removeChild(document.getElementById("sorttable_sortrevind")), sortfwdind = document.createElement("span"),
                            sortfwdind.id = "sorttable_sortfwdind", sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : "&nbsp;&#x25BE;",
                            void this.appendChild(sortfwdind);
                        theadrow = this.parentNode, forEach(theadrow.childNodes, function(cell) {
                            1 == cell.nodeType && (cell.className = cell.className.replace("sorttable_sorted_reverse", ""),
                                cell.className = cell.className.replace("sorttable_sorted", ""));
                        }), sortfwdind = document.getElementById("sorttable_sortfwdind"), sortfwdind && sortfwdind.parentNode.removeChild(sortfwdind),
                            sortrevind = document.getElementById("sorttable_sortrevind"), sortrevind && sortrevind.parentNode.removeChild(sortrevind),
                            this.className += " sorttable_sorted", sortfwdind = document.createElement("span"),
                            sortfwdind.id = "sorttable_sortfwdind", sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : "&nbsp;&#x25BE;",
                            this.appendChild(sortfwdind), row_array = [], col = this.sorttable_columnindex,
                            rows = this.sorttable_tbody.rows;
                        for (var j = 0; j < rows.length; j++) row_array[row_array.length] = [ sorttable.getInnerText(rows[j].cells[col]), rows[j] ];
                        row_array.sort(this.sorttable_sortfunction), tb = this.sorttable_tbody;
                        for (var j = 0; j < row_array.length; j++) tb.appendChild(row_array[j][1]);
                        delete row_array;
                    }));
            }
        },
        guessType: function(table, column) {
            sortfn = sorttable.sort_alpha;
            for (var i = 0; i < table.tBodies[0].rows.length; i++) if (text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]),
                "" != text) {
                if (text.match(/^-?[�$�]?[\d,.]+%?$/)) return sorttable.sort_numeric;
                if (possdate = text.match(sorttable.DATE_RE)) {
                    if (first = parseInt(possdate[1]), second = parseInt(possdate[2]), first > 12) return sorttable.sort_ddmm;
                    if (second > 12) return sorttable.sort_mmdd;
                    sortfn = sorttable.sort_ddmm;
                }
            }
            return sortfn;
        },
        getInnerText: function(node) {
            if (!node) return "";
            if (hasInputs = "function" == typeof node.getElementsByTagName && node.getElementsByTagName("input").length,
                null != node.getAttribute("sorttable_customkey")) return node.getAttribute("sorttable_customkey");
            if ("undefined" != typeof node.textContent && !hasInputs) return node.textContent.replace(/^\s+|\s+$/g, "");
            if ("undefined" != typeof node.innerText && !hasInputs) return node.innerText.replace(/^\s+|\s+$/g, "");
            if ("undefined" != typeof node.text && !hasInputs) return node.text.replace(/^\s+|\s+$/g, "");
            switch (node.nodeType) {
                case 3:
                    if ("input" == node.nodeName.toLowerCase()) return node.value.replace(/^\s+|\s+$/g, "");

                case 4:
                    return node.nodeValue.replace(/^\s+|\s+$/g, "");

                case 1:
                case 11:
                    for (var innerText = "", i = 0; i < node.childNodes.length; i++) innerText += sorttable.getInnerText(node.childNodes[i]);
                    return innerText.replace(/^\s+|\s+$/g, "");

                default:
                    return "";
            }
        },
        reverse: function(tbody) {
            newrows = [];
            for (var i = 0; i < tbody.rows.length; i++) newrows[newrows.length] = tbody.rows[i];
            for (var i = newrows.length - 1; i >= 0; i--) tbody.appendChild(newrows[i]);
            delete newrows;
        },
        sort_numeric: function(a, b) {
            return aa = parseFloat(a[0].replace(/[^0-9.-]/g, "")), isNaN(aa) && (aa = 0), bb = parseFloat(b[0].replace(/[^0-9.-]/g, "")),
                isNaN(bb) && (bb = 0), aa - bb;
        },
        sort_alpha: function(a, b) {
            return a[0] == b[0] ? 0 : a[0] < b[0] ? -1 : 1;
        },
        sort_ddmm: function(a, b) {
            return mtch = a[0].match(sorttable.DATE_RE), y = mtch[3], m = mtch[2], d = mtch[1],
                1 == m.length && (m = "0" + m), 1 == d.length && (d = "0" + d), dt1 = y + m + d,
                mtch = b[0].match(sorttable.DATE_RE), y = mtch[3], m = mtch[2], d = mtch[1], 1 == m.length && (m = "0" + m),
                1 == d.length && (d = "0" + d), dt2 = y + m + d, dt1 == dt2 ? 0 : dt2 > dt1 ? -1 : 1;
        },
        sort_mmdd: function(a, b) {
            return mtch = a[0].match(sorttable.DATE_RE), y = mtch[3], d = mtch[2], m = mtch[1],
                1 == m.length && (m = "0" + m), 1 == d.length && (d = "0" + d), dt1 = y + m + d,
                mtch = b[0].match(sorttable.DATE_RE), y = mtch[3], d = mtch[2], m = mtch[1], 1 == m.length && (m = "0" + m),
                1 == d.length && (d = "0" + d), dt2 = y + m + d, dt1 == dt2 ? 0 : dt2 > dt1 ? -1 : 1;
        },
        shaker_sort: function(list, comp_func) {
            for (var b = 0, t = list.length - 1, swap = !0; swap; ) {
                swap = !1;
                for (var i = b; t > i; ++i) if (comp_func(list[i], list[i + 1]) > 0) {
                    var q = list[i];
                    list[i] = list[i + 1], list[i + 1] = q, swap = !0;
                }
                if (t--, !swap) break;
                for (var i = t; i > b; --i) if (comp_func(list[i], list[i - 1]) < 0) {
                    var q = list[i];
                    list[i] = list[i - 1], list[i - 1] = q, swap = !0;
                }
                b++;
            }
        }
    }, document.addEventListener && document.addEventListener("DOMContentLoaded", sorttable.init, !1),
        /WebKit/i.test(navigator.userAgent)) var _timer = setInterval(function() {
        /loaded|complete/.test(document.readyState) && sorttable.init();
    }, 10);

    window.onload = sorttable.init, dean_addEvent.guid = 1, fixEvent.preventDefault = function() {
        this.returnValue = !1;
    }, fixEvent.stopPropagation = function() {
        this.cancelBubble = !0;
    }, Array.forEach || (Array.forEach = function(array, block, context) {
        for (var i = 0; i < array.length; i++) block.call(context, array[i], i, array);
    }), Function.prototype.forEach = function(object, block, context) {
        for (var key in object) "undefined" == typeof this.prototype[key] && block.call(context, object[key], key, object);
    }, String.forEach = function(string, block, context) {
        Array.forEach(string.split(""), function(chr, index) {
            block.call(context, chr, index, string);
        });
    };

    var forEach = function(object, block, context) {
        if (object) {
            var resolve = Object;
            if (object instanceof Function) resolve = Function; else {
                if (object.forEach instanceof Function) return void object.forEach(block, context);
                "string" == typeof object ? resolve = String : "number" == typeof object.length && (resolve = Array);
            }
            resolve.forEach(object, block, context);
        }
    }, TblId, SearchFlt, SlcArgs;

    TblId = new Array(), SlcArgs = new Array();

    var colValues = new Array(), shindig = function() {
        function checkEnter() {
            var evt = evt ? evt : event ? event : null, node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
            return 13 == evt.keyCode && "submit" != node.type ? !1 : void 0;
        }
        function setLinkFormat(tr, item) {
            var td, link;
            td = document.createElement("td"), link = document.createElement("a"), link.href = item.link_url,
                link.target = "postTarget", item.join_now ? (link.innerHTML = "Join", link.target = "_blank") : link.innerHTML = "Delete",
                td.appendChild(link), tr.appendChild(td);
        }
        function dateRangeExceeded(e) {
            var today = new Date(), dateToTest = new Date(e.target.value);
            e.target.setCustomValidity(dateToTest > today.addMonths(6) ? "Please pick a date less than 6 months from now (" + new Date().toString() + ")." : "");
        }
        function validateForm(event) {
            event = event ? event : window.event;
            var form = event.target ? event.target : event.srcElement, formvalid = !0;
            if (recurring.checked) {
                var checkboxes = form.querySelector('[name="days_of_the_week"]:checked');
                if (!checkboxes) {
                    formvalid = !1;
                    var errormsg = form.querySelector(".days-of-week-error");
                    errormsg.classList.remove("hidden");
                }
            }
            if (formvalid) {
                if (document.querySelector(".fltrow")) {
                    var subheading = form.querySelector("#subheading").value, eventType = form.querySelector('[name="event_type"]:checked').value;
                    setFilterGrid("event-table"), TF_SetFilterValue("event-table", 0, eventType + " - " + subheading),
                        TF_SetFilterValue("event-table", 1, form.querySelector("#description").value), TF_Filter("event-table");
                }
            } else event.preventDefault && event.preventDefault();
            return formvalid;
        }
        var i, host, form = document.getElementById("shindig-signup"), recurring = form.querySelector("#RecurringEvent"), dates = form.querySelectorAll("[type=date]");
        if (form) {
            var a = document.createElement("a");
            a.href = form.action, host = a.host;
        }
        for (Date.prototype.addMonths = function(n) {
            var day = this.getDate();
            return this.setMonth(this.getMonth() + n), this.getDate() < day && (this.setDate(1),
                this.setDate(this.getDate() - 1)), this;
        }, i = dates.length; i--; ) dates[i].addEventListener("input", dateRangeExceeded);
        return document.getElementById("startdate").value = new Date().toISOString().slice(0, 10),
            form.onsubmit = validateForm, form.onkeypress = checkEnter, {
            host: host,
            path: "events",
            buildLink: setLinkFormat
        };
    }();

    !function() {
        "use strict";
        var postTarget, clearFilters, el, getEvents, populateEvents, buildTD, webcalURL, isFirstTime;
        isFirstTime = !0;
        webcalURL = "webcal://" + shindig.host + "/createical?eid=";
        postTarget = document.getElementById("postTarget");
            
        postTarget && (postTarget.onload = function() {
            if (isFirstTime) {
                isFirstTime = !1; 
            } else {
                getEvents();
                var eventsRadioButton = document.getElementById("s3");
                eventsRadioButton && (eventsRadioButton.checked = !0);
            }
        });

        clearFilters = document.getElementById("shindig-clear-filters"); 

        clearFilters && (clearFilters.onclick = function() {
            TF_ClearFilters("event-table"), TF_Filter("event-table");
        });

        // loops over all of the default field values and sets the 
        // associated input fields with their values
        for (var element in shindig_defaults) { 
            shindig_defaults.hasOwnProperty(element);
            el = document.getElementById(element);

            if(el) {
                el.value = shindig_defaults[element];
            }
        }

        JSONP.init({
            error: function(ex) {
                alert("Failed to load : " + ex.url);
            }
        });

        buildTD = function(tr, data) {
            var td;
            return td = document.createElement("td"), td.innerHTML = data, tr.appendChild(td),
                td;
        };

        // Populates the events on the Events tab page for instructors to see which courses
        // are currently going on.
        populateEvents = function(data) {
            console.log("AHHHH");
            var eventDateSortable;
            var eventList = document.getElementById("event-list"); 
            var len = data.length || 0;
            var item = null;
            var tr = null;

            if (isFirstTime = !1, eventList.innerHTML = "", eventList && data && len > 0) {
                 
                 for (var i = 0; len > i; i++) {
                    var eventDate, eventDateSortable, now, startTime, endTime, special;

                    item = data[i], now = new Date(), startTime = new Date(item.start), eventDate = startTime.toDateString();
                   
                    try {
                        eventDateSortable = startTime.toISOString().slice(0, 10);
                    } catch (ex) {
                        eventDateSortable = ex.message;
                    }

                    try {
                        startTime = startTime.toLocaleTimeString();
                    } catch (ex) {
                        startT
                        ime = ex.message;
                    }

                    endTime = new Date(item.end); 
                    endTime = endTime.toLocaleTimeString();
                    tr = document.createElement("tr");
                    tr.className += "event-type " + item.event_type;
                    buildTD(tr, item.event_type + " - " + item.subheading + '<a href="' + webcalURL + item.eid + '" title="Click to add to Calendar"><i class="icon-calendar"></i></a>');
                    buildTD(tr, item.description);
                    special = buildTD(tr, eventDate);
                    special.setAttribute("sorttable_customkey", eventDateSortable);
                    buildTD(tr, startTime);
                    buildTD(tr, endTime);
                    shindig.buildLink(tr, item);
                    eventList.appendChild(tr);
                }
            }
            len > 0 && (document.querySelector(".fltrow") ? TF_Filter("event-table") : window.setTimeout(function() {
                setFilterGrid("event-table"), TF_Filter("event-table");
            }, 100));
        };

        getEvents = function() {
            var institution, course;
            institution = document.getElementById("institution").value; 
            course = document.getElementById("course").value;

            JSONP.get("//" + shindig.host + "/" + shindig.path + "/", {
                institution: institution,
                course: course
            }, populateEvents);
        };

        $("#tabs").tabs({ active: 2 })();
        console.log("tabs", $("#tabs"));

        $('.tabs').bind('click', function (e) {
            window.activeTab = e.target;

            var label = e.target.textContent;
            if(label == "Events") {
                //alert.show("ahh");
                getEvents();
            }
            
        });
    }();
}