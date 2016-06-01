exports.ru = {
    db: {
        systemModule: {
            name: 'Система',
            desc: 'Содержит метрики для мониторинга операционной системы.',
            type: 'os',
            metric: {
                cpu: {
                    name: 'Процессор',
                    desc: 'Информация о загрузке центрального процессора.'
                }
            }
        },
        HAProxyModule: {
            name: 'HAProxy',
            desc: 'Содержит метрики для мониторинга за приложением HAProxy.',
            type: 'app'
        }
    },
    
    settings: {
        title: 'Настройка мониторинга',
        pageTitle: 'Настройка мониторинга',
        panelTitle: 'Настройки метрик для сервера',
        
        settingsTitle: 'Настройки для метрик',
        emptySettings: 'Для данного сервера отсутствуют настройки. Введите и сохраните значения для активации метрики.',
        
        save: {
            success: 'Настройки для метрики успешно сохранены.',
            notModify: 'Для метрики не обнаружены какие-либо изменения.'
        },
        
        emptyMetrics: '<string>Внимание!</string> Для данного модуля отсутстуют настройки метрик.',
        
        metricName: 'Метрика',
        serverName: 'Сервер',
        
        interval: 'Интервал (мин.):',
        repeat: 'Кол-во повторений для срабатывания:',
        isActive: 'Активирован',
        threshold: {
            name: 'Пороги',
            warning: 'Предупреждающий:',
            critical: 'Критический:'
        }
    }
};

exports.us = {
    db: {
        systemModule: {
            name: 'System',
            desc: 'Contains metrics for operation system.',
            type: 'os',
            metric: {
                cpu: {
                    name: 'CPU',
                    desc: 'CPU usage information.'
                }
            }
        },
        HAProxyModule: {
            name: 'HAProxy',
            desc: 'Contains metrics for HAProxy.',
            type: 'app'
        }
    },

    settings: {
        title: 'Monitoring settings',
        pageTitle: 'Monitoring settings'
    }
};