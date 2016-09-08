exports.ru = {
    menu: {
        id: 'monitoring',
        name: 'Мониторинг',
        icon: 'fa-line-chart',
        subs: [
            {id: 'monitoring-nodes-sub', url: '/monitoring/nodes', name: 'Узлы'},
            {id: 'monitoring-netmap-sub', url: '/monitoring/netmap', name: 'Сетевая карта узлов'},
            {id: 'monitoring-settings-sub', url: '/monitoring/settings', name: 'Настройки'}
        ]
    },

    nodes: {
        title: 'Мониторинг',
        pageTitle: 'Мониторинг',

        nodeDetails: {
            emptyData: 'С данным узлом еще ни разу не устанавливалось успешное соединение для получения детальной информации.',
            title: 'Информация об узле',
            os: 'Операционная система',
            version: 'Версия',
            platform: 'Платформа',
            arch: 'Архитектура',
            kernel: 'Ядро',
            uptime: 'Последний запуск',
            inet: 'Интерфейс по умолчанию',
            host: 'Имя машины',
            status: {
                title: 'Статус',
                up: 'вкл',
                down: 'выкл'
            },
            ip: 'IP',
            mac: 'MAC'
        },

        metrics: {
            emptyData: 'Данному узлу еще не поступал запрос на сбор показетелй метрик.',
            title: 'Метрики'
        }
    },
    
    settings: {
        title: 'Настройка мониторинга',
        pageTitle: 'Настройка мониторинга',
        settingsWords: {
            title: 'Настройка исключений для метрик',
            existRules: 'Текущие исключения:',
            emptyData: 'Данному узлу еще не поступал запрос на сбор показетелй метрик.'
        }
    },

    netmap: {
        title: 'Сетевая карта узлов',
        pageTitle: 'Сетевая карта узлов',
        
        save: {
            btn: 'Сохранить расположение',
            toastr: 'Координаты расположения узлов на карте сохранены.'
        },

        tooltip: {
            state: 'Состояние',
            metrics: {
                title: 'Метрики',
                more: 'Подробнее'
            }
        }
    },

    ajax: {
        settings: {
            ok: 'Новое исключение успешно добавлено.',
            removed: 'Исключение успешно удалено.',
            notExist: 'Исключение не существует.',
            exist: 'Исключение уже существует.'
        }
    }
};

exports.us = {
    menu: {
        id: 'monitoring',
        name: 'Monitoring',
        icon: 'fa-line-chart',
        subs: [
            {id: 'monitoring-nodes-sub', url: '/monitoring/nodes', name: 'Nodes'},
            {id: 'monitoring-netmap-sub', url: '/monitoring/netmap', name: 'Network map nodes'},
            {id: 'monitoring-settings-sub', url: '/monitoring/settings', name: 'Settings'}
        ]
    },

    nodes: {
        title: 'Monitoring',
        pageTitle: 'Monitoring',

        nodeDetails: {
            emptyData: 'The node has never been a successful connection for receiving details.',
            title: 'Information about the the node',
            os: 'Operation system',
            version: 'Version',
            platform: 'Platform',
            arch: 'Architecture',
            kernel: 'Kernel',
            uptime: 'Last boot',
            inet: 'Default network interface',
            host: 'Hostname',
            status: {
                title: 'State',
                up: 'up',
                down: 'down'
            },
            ip: 'IP',
            mac: 'MAC'
        },

        metrics: {
            emptyData: 'This node has not yet received a request for the collection of metrics.',
            title: 'Metrics'
        }
    },

    settings: {
        title: 'Configuring monitoring',
        pageTitle: 'Configuring monitoring',
        settingsWords: {
            title: 'Configure exceptions for metrics',
            existRules: 'Current exceptions:',
            emptyData: 'This node has not yet received a request for the collection of metrics.'
        }
    },

    netmap: {
        title: 'Network map nodes',
        pageTitle: 'Network map nodes',

        save: {
            btn: 'Save location',
            toastr: 'Coordinates of nodes stored location on the map.'
        },

        tooltip: {
            state: 'State',
            metrics: {
                title: 'Metrics',
                more: 'More'
            }
        }
    },

    ajax: {
        settings: {
            ok: 'A new exception is added successfully.',
            removed: 'The exception was successfully removed.',
            notExist: 'The exception does not exist.',
            exist: 'The exception already exists.'
        }
    }
};