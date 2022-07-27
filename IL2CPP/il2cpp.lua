local create_namespace
local namespace_functions = {}

---@param self Namespace
function namespace_functions.M(self)
    return self
end

---@param self Namespace
function namespace_functions.Instance(self)
    return sdk.get_managed_singleton(self._name)
end

local namespace_builder_metatable = {
    ---@param name string
    __index = function(self, name)
        -- Fallback for fields that can't be taken as symbols
        if namespace_functions[name] then
            return namespace_functions[name](self)
        end
        local typedef = rawget(self, "_typedef")
        if typedef then
            local field = typedef:get_field(name)
            if field then
                if field:is_static() then
                    return field:get_data()
                end
                return field
            end

            local method = typedef:get_method(name)
            if method then
                return method
            end
        end
        local force = false
        if name:sub(1, 2) == "__" then
            name  = name:sub(3)
            force = true
        end
        return create_namespace(rawget(self, "_name") .. "." .. name, force)
    end
}

create_namespace = function(basename, force_namespace)
    force_namespace = force_namespace or false

    ---@class Namespace
    local table = { _name = basename }
    if sdk.find_type_definition(basename) and not force_namespace then
        table = { _typedef = sdk.find_type_definition(basename), _name = basename }
    else
        table = { _name = basename }
    end
    return setmetatable(table, namespace_builder_metatable)
end


return create_namespace("")
