var columnContentTemplate = '<div class="card"><div class="card-header"></div><div class="card-block"></div></div>';
var columnTemplate = '<div class="$size"></div>';

function BootstrapTable(scope) {
    this.columnClassPrefix = 'col-xs-';
    this.$scope = $(scope);
}

BootstrapTable.prototype.appendRow = function () {
    var $row = $('<div class="row"></div>');
    this.$scope.append($row);

    return $row;
};

BootstrapTable.prototype.insertRow = function (index) {
    var $row = $('<div class="row"></div>');
    this.$scope.find('.row').get(index -1 ).insertAfter($row);

    return $row;
};

BootstrapTable.prototype.canAddColumnToRow = function (row, columnSize) {
    var self = this;
    var $row = typeof row === 'number' ? this.$scope.find('.row').get(row) : row;
    var size = 0;
    $row.children('div').each(function () {
        var raw = this.className;
        var index;
        if ((index = raw.indexOf(self.columnClassPrefix)) >= 0) {
            size += parseInt(raw[index + self.columnClassPrefix.length], 10);
        }
    });

    return size + columnSize <= 12;
};

BootstrapTable.prototype.rowsCount = function () {
    return this.$scope.find('.row').length;
};

BootstrapTable.prototype.deleteRowByIndex = function(index) {
    this.$scope.find('.row').get(index).remove();
};

BootstrapTable.prototype.appendColumn = function (size, index) {
    var $row = null;
    if (this.rowsCount() == 0) {
        $row = this.appendRow();
    }

    if (index !== undefined) {
        $row = this.insertRow(index);
    } else {
        $row = this.$scope.find('.row').last();
    }

    var $column = $(columnTemplate.replace('$size', this.columnClassPrefix + size));
    //$column.append(columnContentTemplate);

    if (this.canAddColumnToRow($row, size)) {
        $row.append();
        $row.append($column);
    } else {
        $row = this.appendRow();
        $row.append($column);
    }

    return $column;
};

BootstrapTable.prototype.deleteColumn = function ($column) {
    var $row = $column.closest('.row');

    if ($row.children('div').length == 1) {
        $row.remove();
        return;
    }

    $column.remove();
    
    //TODO iterate all table to check free space
};

BootstrapTable.prototype.empty = function () {
    this.$scope.empty();    
};