# Command pendings

## [`/report`]()
|Arguments|   Use  |      Parameters    | Environments |
|---------|--------|--------------------|-|
|  `none` |`Public`|`reply` or `text`   | `group`  `private` |
> Reporta un error respondiendo al mensaje o agregando una descripcion
> detallada en el mensaje y este sera enviado al grupo de soporte.
* Example
```txt
/report The /ban command failed when trying to ban an administrator
```


## `/apply`
|Arguments| Use    |Parameters| Environments|
|---------|--------|----------|-|
|  `none` |`Public`|`text`    |`group` `private`|
> Solicita acceso al bot por medio de chat privado al creador del 
> grupo | supergrupo | canal | privado mediante una solicitud al grupo de soporte 
> con la informacion detallada del grupo en cuestion para decidir su aprovacion.

## `/accept`
|Arguments| Use    |Parameters| Environments |
|---------|--------|----------|-|
| `none`  |`Owner`|`none`    | `group` `private` |
> Acepta por medio de un id o mensaje l solicitud de uso del bot y guarda su id en la base de datos deo bot [comando de uso general en todo el bot]

## `/decline`
|Arguments| Use    |Parameters|Environments|
|---------|--------|----------|-|
|  `none` |`Owner`|`none`    |`group` `private` |
> Rechaza la solicitud de admision par el uso del bot y retorna un mensaje personalizado aobre el motivo por el cual se denego el permiso al uso del bot

## `/antispam`
|Arguments| Use    |Parameters| Environments|
|---------|--------|----------|-|
|`$on` `$off`|`Owner` `creator`|`none`|`group`|
> Activa o desactiva el filtro de spam en el grupo en cuestion

## `/antiflood`
|Arguments| Use    |Parameters| Environments|
|---------|--------|----------|-|
|`$on` `$off`|`Owner` `creator`|`none`|`group`|
> Activa o desactiva el filtro de flood en el grupo en cuestion



