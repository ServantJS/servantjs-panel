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

OSModule.prototype.handleSummaryCPUBar = function (metric, data) {
    this.$moduleBlock.find('.card-block').append(
        '<div class="row"><div class="col-xs-3">' + metric.name[lang] + '</div><div class="col-xs-2 cpu-value">' +
        '</div><div class="col-xs-7 cpu-scope">' +
        '</div></div></div>');

    if (!data) {
        this.$moduleBlock.find('.cpu-scope').append('<span>' + this.words.emptyData + '</span>');

        return;
    }

    var totalLoad = data.map(function (item) {
        return item.total;
    });

    var val = totalLoad.reduce(function (pv, cv) {
        return pv + cv;
    }, 0);

    var current = Math.round(val / totalLoad.length);

    this.$moduleBlock.find('.cpu-value').text(current + '%');
    this.$moduleBlock.find('.cpu-scope').append(this.getProgressBar(metric.settings[0], current, 100));
};

OSModule.prototype.handleSummaryRAMBar = function (metric, data) {
    this.$moduleBlock.find('.card-block').append(
        '<div class="row"><div class="col-xs-3">' + metric.name[lang] + '</div><div class="col-xs-2 ram-value">' +
        '</div><div class="col-xs-7 ram-scope">' +
        '</div></div></div>');

    if (!data) {
        this.$moduleBlock.find('.ram-scope').append('<span>' + this.words.emptyData + '</span>');
        return;
    }

    var current = Math.round((data.total - data.free) / data.total * 100);

    this.$moduleBlock.find('.ram-value').text(current + '%');
    this.$moduleBlock.find('.ram-scope').append(this.getProgressBar(metric.settings[0], current, 100));
};

OSModule.prototype.handleSummary = function () {
    var self = this;
    
    this.metrics.forEach(function (item) {
        $.get('/monitoring/servers/' + self.workerId + '/metrics/' + item._id + '/event', function (result) {
            try {
                console.log(result);
                if (result.ok) {

                    if (item.sys_name === 'os_cpu') {
                        self.handleSummaryCPUBar(item, result.data);
                    }

                    if (item.sys_name === 'os_ram') {
                        self.handleSummaryRAMBar(item, result.data);
                    }
                } else {
                    //TODO Handler ERROR!!!! AAAAAAAAA
                }
            } catch (e) {
                console.error(e);
            }
        });
    });

    self.table.appendColumn(6).append(self.$moduleBlock);
};

var InitOS = function(table, workerId, module, words) {
    module.table = table;
    module.workerId = workerId;
    module.words = words;
    
    new OSModule(module);

    console.log('OS module initialized');
};