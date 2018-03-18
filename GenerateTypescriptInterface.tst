${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    // Uncomment the constructor to change template settings.
    Template(Settings settings)
    {
		settings.IncludeCurrentProject();
        settings.OutputExtension = ".d.ts";
		settings.OutputFilenameFactory = file => {
			string folder = "ClientApp/app/models/";
			return folder + file.Name.Replace(".cs", string.Empty);
		};
    }

	bool IncludeClass(Class @class) {
		return @class.Namespace.Equals("DeputyUI.Models");
	}

	bool IncludeEnum(Enum @enum) {
		return @enum.Namespace.Equals("DeputyUI.Models");
	}

	IEnumerable<Type> Imports(File file) {
		return file.Classes
					.SelectMany(c => c.Properties
						.SelectMany(p => p.Type.TypeArguments.Concat(new [] { p.Type}))
					.Distinct()
					.Where(w=> w.IsDefined));
	}

    string JsonName(Property prop) {
        var attr = prop.Attributes.FirstOrDefault(a => a.FullName.Equals("Newtonsoft.Json.JsonPropertyAttribute"));

        if (attr != null) {
            return attr.Value;
        }

        return prop.name;
    }

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
}$Imports[import { $Name } from './$Name';][
]
// module DeputyUi {
    $Classes(c => IncludeClass(c))[
	// $Namespace.$Name
    export interface $Name {
        $Properties[
        // $Name
        public $JsonName: $Type;]
    }]
// }