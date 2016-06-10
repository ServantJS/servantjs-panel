function OSModule(options) {
    this.id = options._id;

    console.log(options);

    this.name = options.name[lang];
    this.description = options.description[lang];
    this.metrics = options.metrics;
    this.workerId = options.workerId;
    this.table = options.table;
    this.words = options.words;

    this.template = '<div class="card"><div class="card-header">' + this.name + '</div><div class="card-block"></div></div>';

    this.$moduleBlock = $(this.template);

    this.handleSummary();
}

var bytesToString = function (value) {
    var fmt = function (val) {
        return val.toFixed(2);
    };

    if (value < 1024) {
        return fmt(value) + ' bps';
    } else if (value < 1024 * 1024) {
        return fmt(value / 1024) + ' Kbps';
    } else if (value < 1024 * 1024 * 1024) {
        return fmt(value / 1024 / 1024) + ' Mbps';
    } else {
        return fmt(value / 1024 / 1024 / 1024) + ' Gbps';
    }
};

OSModule.prototype.getProgressBar = function (settings, val, valMax) {
    var $elem = $('<progress class="progress progress-striped" value="' + val + '" max="' + valMax + '">' + val + '%</progress>');

    if (val < settings.threshold.warning.value) {
        $elem.addClass('progress-success');
    } else if (val >= settings.threshold.warning.value && val < settings.threshold.critical.value) {
        $elem.addClass('progress-warning');
    } else {
        $elem.addClass('progress-danger');
    }

    return $elem;
};

OSModule.prototype.handleSummaryCPUBar = function ($block, metric, data) {
    $block.append(
        '<div class="row"><div class="col-xs-3">' + metric.name[lang] + '</div><div class="col-xs-2 cpu-value">' +
        '</div><div class="col-xs-7 cpu-scope">' +
        '</div></div></div>');

    if (!data) {
        $block.find('.cpu-scope').append('<span>' + this.words.emptyData + '</span>');

        return;
    }

    var totalLoad = data.map(function (item) {
        return item.total;
    });

    var val = totalLoad.reduce(function (pv, cv) {
        return pv + cv;
    }, 0);

    var current = Math.round(val / totalLoad.length);

    $block.find('.cpu-value').text(current + '%');
    $block.find('.cpu-scope').append(this.getProgressBar(metric.settings[0], current, 100));
};

OSModule.prototype.handleSummaryRAMBar = function ($block, metric, data) {
    $block.append(
        '<div class="row"><div class="col-xs-3">' + metric.name[lang] + '</div><div class="col-xs-2 ram-value">' +
        '</div><div class="col-xs-7 ram-scope">' +
        '</div></div></div>');

    if (!data) {
        $block.find('.ram-scope').append('<span>' + this.words.emptyData + '</span>');
        return;
    }

    var current = Math.round((data.total - data.free) / data.total * 100);

    $block.find('.ram-value').text(current + '%');
    $block.find('.ram-scope').append(this.getProgressBar(metric.settings[0], current, 100));
};

OSModule.prototype.handleSummaryNetActivity = function ($block, metric, data) {
    $block.append(
        '<div class="row"><div class="col-xs-3">' + metric.name[lang] + '</div>' +
        '<div class="col-xs-9 net-a-scope">' +
        '</div></div></div>');

    if (!data) {
        $block.find('.net-a-scope').append('<span>' + this.words.emptyData + '</span>');
        return;
    }

    $block.find('.net-a-scope').append(
        '<span><i class="fa fa-arrow-down" style="color: blue"></i> ' + bytesToString(data.total.per_sec.bytes.input) + '</span>' +
        '<span> ' + this.words.bytes.input + '</span>' +
        '<br/>' +
        '<span><i class="fa fa-arrow-up" style="color: red"></i> ' + bytesToString(data.total.per_sec.bytes.output) + '</span>' +
        '<span> ' + this.words.bytes.output + '</span>' +
        '<br/>' +
        '<br/>' +
        '<span><i class="fa fa-arrow-down" style="color: blue"></i> ' + data.total.per_sec.packets.input + '</span>' +
        '<span> ' + this.words.packets.input + '</span>' +
        '<br/>' +
        '<span><i class="fa fa-arrow-up" style="color: red"></i> ' + data.total.per_sec.packets.output + '</span>' +
        '<span> ' + this.words.packets.output + '</span>'
    );
};

OSModule.prototype.handleSummary = function () {
    var self = this;

    console.log(this.metrics);

    this.metrics.sort(function (a, b) {
        return a.view_order - b.view_order;
    });

    this.metrics.forEach(function (item) {
        var $block = $('<div></div>');
        self.$moduleBlock.find('.card-block').append($block);

        $.get('/monitoring/servers/' + self.workerId + '/metrics/' + item._id + '/event', function (result) {
            try {
                if (result.ok) {

                    if (item.sys_name === 'os_cpu') {
                        self.handleSummaryCPUBar($block, item, result.data);
                    }

                    if (item.sys_name === 'os_ram') {
                        self.handleSummaryRAMBar($block, item, result.data);
                    }

                    if (item.sys_name === 'os_net_a') {
                        self.handleSummaryNetActivity($block, item, result.data);
                    }
                } else {
                    //TODO Handler ERROR!!!! AAAAAAAAA
                }
            } catch (e) {
                console.error(e);
            }
        });
    });

    if (this.metrics.length) {
        self.table.appendColumn(6).append(self.$moduleBlock);
    }
};

var InitOS = function(table, workerId, module, words) {
    module.table = table;
    module.workerId = workerId;
    module.words = words;
    
    new OSModule(module);

    console.log('OS module initialized');
};