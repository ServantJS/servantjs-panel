exports.ru = {
    db: {
        systemModule: {
            name: 'Система',
            desc: 'Содержит метрики для мониторинга операционной системы.',
            type: 'os',
            metric: {
                cpu: {
                    name: 'Процессор',
                    desc: 'Информация о загрузке центрального процессора.',
                    event: {
                        on_normal: 'Возврат к норме',
                        on_warning: 'Превышение предупреждающего порога',
                        on_critical: 'Превышение критического порога'
                    }
                },
                ram: {
                    name: 'Память',
                    desc: 'Информация об использование оперативной памяти.',
                    event: {
                        on_normal: 'Возврат к норме',
                        on_warning: 'Превышение предупреждающего порога',
                        on_critical: 'Превышение критического порога'
                    }
                },
                netA: {
                    name: 'Сетевая активность',
                    desc: 'Информация о трафике на сетевых интерфейсах.',
                    event: {
                        on_normal: 'Возврат к норме',
                        on_warning: 'Превышение предупреждающего порога',
                        on_critical: 'Превышение критического порога'
                    }
                }
            }
        },
        nodeDetailsModule: {
            name: 'Информация об узле',
            desc: 'Содержит метрики для сбора общей информации об узле, на котором работает агент.',
            type: 'node',
            metric: {
                details: {
                    name: 'Детальная информация',
                    desc: 'Общая онформация об узле, с которого собираются данные.'
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
        },
        events: 'События'
    },

    servers: {
        title: 'Мониторинг серверов',
        pageTitle: 'Мониторинг серверов',

        agentChooseTitle: 'Выберите агента на сервере',
        agent: 'Агент',
        selectAgent: '--Выберите агента--',

        commonModule: {
            emptyData: 'Данные отсутствуют'    
        },
        
        nodeModule: {
            os: 'Операционная система',
            version: 'Версия',
            platform: 'Платформа',
            arch: 'Архитектура',
            kernel: 'Ядро',
            uptime: 'Последний запуск',
            inet: 'Интерфейс по умолчанию',
            host: 'Имя машины',
            ip: 'IP',
            mac: 'MAC'
        },

        osModule: {
            bytes: {
                input: 'Получено\\сек',
                output: 'Отправлено\\сек'
            },
            packets: {
                input: 'Пакеты входящие\\сек',
                output: 'Пакеты исходящие\\сек'
            }
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
                    desc: 'CPU usage information.',
                    event: {
                        on_normal: 'Return to normal',
                        on_warning: 'Exceeding the warning threshold',
                        on_critical: 'Exceeding the critical threshold'
                    }
                },
                ram: {
                    name: 'RAM',
                    desc: 'RAM usage information.',
                    event: {
                        on_normal: 'Return to normal',
                        on_warning: 'Exceeding the warning threshold',
                        on_critical: 'Exceeding the critical threshold'
                    }
                },
                netA: {
                    name: 'Network activity',
                    desc: 'Network activity information.',
                    event: {
                        on_normal: 'Return to normal',
                        on_warning: 'Exceeding the warning threshold',
                        on_critical: 'Exceeding the critical threshold'
                    }
                }
            }
        },
        nodeDetailsModule: {
            name: 'Node details',
            desc: 'It contains the metrics to collect general information about the node where the agent is running.',
            type: 'node',
            metric: {
                details: {
                    name: 'Details',
                    desc: 'Summary information about node.'
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