exports.ru = {
    configs: {
        title: 'NGINX конфиги',
        pageTitle: 'Конфиги',
        table: {
            name: 'Список конфигов',
            columns: {
                name: 'Наименование',
                group: 'Группа',
                target: 'Цель',
                state: 'Статус'
            }
        },

        modal: {
            title: 'Создать новый конфигурационный файл',
            editTitle: 'Редактирование конфигурационного файла',
            customTemplate: 'Произвольный',
            chooseTemplate: '--Выберите шаблон--',
            chooseGroup: '--Выберите группу--',
            
            fields: {
                name: 'Наименование',
                template: 'Шаблон',
                content: 'Содержимое',
                group: 'Группа',
                vars: 'Переменные',
                kind: 'Исключить возможность изменения статуса для конфига?'
                
            }
        }
    },
    
    groups: {
        title: 'NGINX группы',
        pageTitle: 'Группы конфигов',

        hint: {
            name: 'Подсказка',
            content: 'С помощью групп указывается место расположения создаваемых конфигурационных файлов. Группа может быть привязана к отдельному серверу или к группе серверов. Директория, которая указывается для группы, автоматически не создается, поэтому прежде чем создавать, убедитесь, что директория существует. '
        },

        table: {
            name: 'Список групп',
            columns: {
                name: 'Наименование',
                target: 'Цель',
                sourceDir: 'Директория'
            }
        },

        modal: {
            title: 'Создать новую группу конфигурационных файлов',
            fields: {
                name: 'Наименование',
                target: 'Цель',
                sourceDir: 'Директория'
            }
        }
    },

    templates: {
        title: 'NGINX шаблоны',
        pageTitle: 'Шаблоны конфигов',
        table: {
            name: 'Список шаблонов'
        },

        item: {
            template: 'Шаблон',
            vars: 'Переменные'
        },

        hint: {
            name: 'Подсказка',
            content: 'Шаблоны полезны, если вам приходится создавать однотипные конфигурационные файлы для nignx, которые различаются парой параметров. Каждый шаблон содержит набор конфигураций и переменных для замены их внутри шаблона.'
        },
        
        modal: {
            title: 'Создать новый шаблон',
            fields: {
                name: 'Наименование',
                content: 'Содержимое',
                vars: {
                    title: 'Переменные',
                    name: 'Наименование',
                    desc: 'Описание',
                    pattern: '${Паттерн}',
                    patternHint: 'Паттерн: Значение переменной внутри конфига. Например, ${domain}',
                    value: 'Значение'
                }
            }
        }
    },

    ajax: {
        delete: {
            ok: ' успешно удалена.',
            notOk: ' не может быть удалена, так как есть привязанные конфигурационные файлы.'
        }
    }
};

exports.us = {
    configs: {
        title: 'NGINX configs',
        pageTitle: 'Configs',
        table: {
            name: 'Configs list',
            columns: {
                name: 'Name',
                group: 'Group',
                target: 'Target',
                state: 'State'
            }
        },

        modal: {
            title: 'Create a new config file',
            editTitle: 'Edit the config file',
            customTemplate: 'Custom',
            chooseTemplate: '--Choose template--',
            chooseGroup: '--Choose group--',

            fields: {
                name: 'Name',
                template: 'Template',
                content: 'Content',
                group: 'Group',
                vars: 'Variables',
                kind: 'Exclude the possibility of changing the status of the config?'

            }
        }
    },

    groups: {
        title: 'NGINX groups',
        pageTitle: 'Configs group',

        hint: {
            name: 'Hint',
            content: 'With the groups specified location created configuration files. The group may be linked to a specific server or group of servers. The directory, which is indicated for the group is not automatically created, so before you create, make sure that the directory exists.'
        },

        table: {
            name: 'Список групп',
            columns: {
                name: 'Name',
                target: 'Target',
                sourceDir: 'Directory'
            }
        },

        modal: {
            title: 'Create a new config\'s group',
            fields: {
                name: 'Name',
                target: 'Target',
                sourceDir: 'Directory'
            }
        }
    },

    templates: {
        title: 'NGINX templates',
        pageTitle: 'Configs template',
        table: {
            name: 'Configs template'
        },

        item: {
            template: 'Template',
            vars: 'Variables'
        },

        hint: {
            name: 'Hine',
            content: 'Templates are useful when you have to create the same type of configuration files for nignx, which differ in a couple of settings. Each template contains a set of configurations and variables to replace them in the template.'
        },

        modal: {
            title: 'Create a new template',
            fields: {
                name: 'Name',
                content: 'Content',
                vars: {
                    title: 'Variables',
                    name: 'Name',
                    desc: 'Description',
                    pattern: '${Pattern}',
                    patternHint: 'Pattern: The value of the variable in the config. For example, $ {domain}',
                    value: 'Value'
                }
            }
        }
    },

    ajax: {
        delete: {
            ok: ' successfully removed.',
            notOk: ' can not be removed, as there is bound configuration files.'
        }
    }
};