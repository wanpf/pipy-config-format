(
  (
    config = JSON.decode(pipy.load('config.json')),

    modules = {},

    datas = {},

    chains = {},

    load_module = (config, name) => (
      !modules[name] && (modules[name] = {}) &&
      Object.entries(config?.[name] || {}).map(
        ([k, v]) => (
          modules[name][k] = {},
          Object.keys(v).map(
            key => (
              key.endsWith('_joinRef') && (
                (
                  join = key.substring(0, key.length - 8),
                  priority = v?.[key + 'Priority'] || 100,
                ) => (
                  !modules[join] && (
                    load_module(config, join)
                  ),
                  !modules[join] && (
                    console.log('can not find module:', join),
                    pipy.exit()
                  ),
                  priority < 0 ? (
                    priority = 100 - priority,
                    (v?.[key] || []).map(
                      e => config?.[join]?.[e] ? (
                        modules[name][k][priority] ? (
                          !modules[name][k][priority].find(o => o === join) && modules[name][k][priority].push({ module: join, name: e })
                        ) : (
                          modules[name][k][priority] = [{ module: join, name: e }]
                        )
                      ) : (
                        console.log('can not find module item', join, e),
                        pipy.exit()
                      )
                    )
                  ) : (
                    (v?.[key] || []).map(
                      e => config?.[join]?.[e] ? (
                        modules[join][e][priority] ? (
                          !modules[join][e][priority].find(o => o === name) && modules[join][e][priority].push({ module: name, name: k })
                        ) : (
                          modules[join][e][priority] = [{ module: name, name: k }]
                        )
                      ) : (
                        console.log('can not find module item', join, e),
                        pipy.exit()
                      )
                    )
                  )
                )
              )(),
              key.endsWith('_dataRef') && (
                (
                  data = key.substring(0, key.length - 8),
                ) => (
                  config?.[data]?.[v?.[key]] ? (
                    !datas[data] && (datas[data] = {}),
                    datas[data][v?.[key]] = true
                  ) : (
                    console.log('can not find data:', data),
                    pipy.exit()
                  )
                )
              )()
            )
          )
        )
      )
    ),

    expand_module = (module, name, level, chain) => (
      Object.keys(modules?.[module]?.[name] || {}).sort(
        (a, b) => Number(a) - Number(b)
      ).forEach(
        p => (
          modules[module][name][p].forEach(
            o => (
              chain.push({ ...o, priority: p, level: level }),
              (level > 18) ? (
                console.log('too many levels, chain:', chain),
                pipy.exit()
              ) : (
                expand_module(o.module, o.name, level + 1, chain)
              )
            )
          )
        )
      ),
      chain.sort(
        (a, b) => (
          a.level === b.level ? (
            a.priority - b.priority
          ) : (
            a.level - b.level
          )
        )
      )
    ),

    make_chain = joinArray => (
      (
        chain = [],
      ) => (
        joinArray.forEach(
          o => (
            chain = chain.filter(m => m !== o.module),
            chain.push(o.module)
          )
        ),
        chain
      )
    )(),

    make_listeners_chain = (config) => (
      Object.fromEntries(
        Object.entries(config?.listeners || {}).map(
          ([k, _]) => [k, make_chain(expand_module('listeners', k, 1, []))]
        )
      )
    ),

  ) => (

    Object.keys(config).map(
      name => (
        load_module(config, name)
      )
    ),

    Object.keys(modules).map(
      name => (
        console.log(`[module - ${name}]`, JSON.stringify(modules[name], null, 4))
      )
    ),

    chains = make_listeners_chain(config, modules),

    console.log("[listeners chain]", JSON.stringify(chains, null, 4)),

    Object.keys(datas).map(
      name => (
        console.log("[data]", name, datas[name])
      )
    )

    // , pipy()
  )

)()
