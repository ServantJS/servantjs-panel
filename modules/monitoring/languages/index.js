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
            type: 'app',
            metric: {
                stat: {
                    name: 'Статистика',
                    desc: 'Подробная информация о каждом сервере, удаленном сервере внутри HAProxy.',
                    event: {
                        on_up: 'Сервер доступен',
                        on_down: 'Сервер недоступен'
                    }
                }
            }
        }
    },

    nodes: {
        title: 'Мониторинг',
        pageTitle: 'Мониторинг',

        nodeDetails: {
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
            title: 'Метрики'
        }
    },
    
    settings: {
        title: 'Настройка мониторинга',
        pageTitle: 'Настройка мониторинга',
        settingsWords: {
            title: 'Настройки исключения для метрик',
            existRules: 'Теущие исключения:'
        }
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
            status: {
                title: 'Статус',
                up: 'вкл',
                down: 'выкл'
            },
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
    },

    haStats: {
        title: 'HAProxy статистика',
        pageTitle: 'HAProxy статистика',

        agentChooseTitle: 'Выберите агента на сервере',
        agent: 'Агент',
        selectAgent: '--Выберите агента--',

        emptyData: 'Данные отсутствуют',

        table: {
            bytes: {
                in: 'Входящие байты',
                out: 'Исходящие байты'
            },
            status: 'Статус',
            statusDesc: 'Описание статуса',
            downtime: 'Простой'
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
            type: 'app',
            metric: {
                stat: {
                    name: 'Statistic',
                    desc: 'Detailed information about each server, backend and frontend in HAProxy.',
                    event: {
                        on_up: 'Server is UP',
                        on_down: 'Server is DOWN'
                    }
                }
            }
        }
    },

    settings: {
        title: 'Configuring monitoring',
        pageTitle: 'Configuring monitoring',
        panelTitle: 'Settings for the server metrics',

        settingsTitle: 'Settings for metrics',
        emptySettings: 'Server settings are missing. Enter and save the value to activate the metric.',

        save: {
            success: 'Metric settings saved successfully.',
            notModify: 'Make any changes for the metric.'
        },

        emptyMetrics: '<string>Attention!</string> There are no metrics setting for this module.',

        metricName: 'Metrics',
        serverName: 'Server',

        interval: 'Interval (min.):',
        repeat: 'Number of repetitions for triggering:',
        isActive: 'Activated',
        threshold: {
            name: 'Thresholds',
            warning: 'Warning:',
            critical: 'Critical:'
        },
        events: 'Events'
    },

    servers: {
        title: 'Monitoring server',
        pageTitle: 'Monitoring server',

        agentChooseTitle: 'Select the agent on the server',
        agent: 'Agent',
        selectAgent: '--Choose agent--',

        commonModule: {
            emptyData: 'No data available'
        },

        nodeModule: {
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

        osModule: {
            bytes: {
                input: 'Receive\\sec',
                output: 'Send\\sec'
            },
            packets: {
                input: 'Incoming packets\\sec',
                output: 'Outgoing packets\\sec'
            }
        }
    },

    haStats: {
        title: 'HAProxy statistic',
        pageTitle: 'HAProxy statistic',

        agentChooseTitle: 'Select the agent on the server',
        agent: 'Agent',
        selectAgent: '--Choose agent--',

        emptyData: 'No data available',

        table: {
            bytes: {
                in: 'Income bytes',
                out: 'Outcome bytes'
            },
            status: 'Status',
            statusDesc: 'Status desc',
            downtime: 'Downtime'
        }
    }
};