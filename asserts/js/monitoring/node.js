function NodeModule(options) {
    this.id = options._id;

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

NodeModule.prototype.fillData = function (metric, data) {
    var leftColumn = 'col-xs-4 text-bold margin-bottom-3';
    var rightColumn = 'col-xs-8';

    if (!data) {
        this.$moduleBlock.find('.card-block').append('<span>' + this.words.emptyData + '</span>');
        return;
    }

    this.$moduleBlock.find('.card-block')
        .css('font-size', '12px')
        .append('<span>' + metric.name[lang] + ':</span>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.os + ':</div><div class="' + rightColumn + '">' + data.os.name + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.version + ':</div><div class="' + rightColumn + '">' + data.os.version + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.platform + ':</div><div class="' + rightColumn + '">' + data.os.type + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.arch + ':</div><div class="' + rightColumn + '">' + data.os.arch + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.kernel + ':</div><div class="' + rightColumn + '">' + data.os.kernel + '</div></div>')

        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.uptime + ':</div><div class="' + rightColumn + '">' +
            (new Date((new Date()).getTime() - data.uptime)).toUTCString() + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.inet + ':</div><div class="' + rightColumn + '">' + data.net.name + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.host + ':</div><div class="' + rightColumn + '">' + data.hostname + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.ip + ':</div><div class="' + rightColumn + '">' + data.net.ip.find(function (item) {
                return item.family == 'IPv4';
            }).address + '</div></div>')
        .append('<div class="row"><div class="' + leftColumn + '">' + this.words.mac + ':</div><div class="' + rightColumn + '">' + data.net.ip[0].mac + '</div></div>')
};

NodeModule.prototype.handleSummary = function () {
    var self = this;

    this.metrics.forEach(function (item) {
        $.get('/monitoring/servers/' + self.workerId + '/metrics/' + item._id + '/event', function (result) {
            try {
                console.log(result);
                if (result.ok) {

                    if (item.sys_name === 'node_details') {
                        self.fillData(item, result.data);
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

var InitNODE = function(table, workerId, module, words) {
    module.table = table;
    module.workerId = workerId;
    module.words = words;

    console.log(module);

    new NodeModule(module);

    console.log('Node module initialized');
};