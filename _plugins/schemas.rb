module Jekyll
  class SchemaGenerator < Generator
    #safe true

    def generate(site)
      dir = 'packages/formats/dist/schemas'
      schemas = Dir['**/*.schema.json', base: dir]
      schemas.each_entry do |schema|
        puts schema
        site.pages << Schema.new(site, site.source, File.dirname(schema), File.basename(schema), dir)
      end
    end

    class Schema < Page
      def initialize(site, base, dir, name, schemadir)
        @site = site
        @base = base
        @dir = dir
        @name = name
        @data ||= {}
        @content = File.read(File.join(schemadir, dir, name))

        self.process(@name)
      end
    end
  end
end