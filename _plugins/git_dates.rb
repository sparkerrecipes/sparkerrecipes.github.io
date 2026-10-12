# Dates each recipe by the commit that first added it, so "By Newest" can sort
# without a `date:` in every file. A `date:` in front matter still wins.
# Needs full git history (fetch-depth: 0 in the Pages workflow).
Jekyll::Hooks.register :site, :post_read do |site|
  site.collections["recipes"].docs.each do |doc|
    next if doc.data["date"]

    added = `git log --follow --diff-filter=A --format=%aI -1 -- "#{doc.path}"`.strip
    doc.data["date"] = Time.parse(added) unless added.empty?
  end
end
