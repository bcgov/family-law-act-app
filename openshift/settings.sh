# bash script to be sourced to set environment variables for OpenShift scripts
export PROJECT_NAMESPACE="jag-csb-jes-family-protection-order"
# The templates that should not have their GIT referances(uri and ref) over-ridden
# Templates NOT in this list will have they GIT referances over-ridden
# with the values of GIT_URI and GIT_REF
export skip_git_overrides="schema-spy-build.json"
export GIT_URI="https://github.com/bcgov/Family-Protection-Order.git"
export GIT_REF="master"

# The builds to be triggered after buildconfigs created (not auto-triggered)
export builds=${builds:-""}

# The images to be tagged after build
export images=${images:-"angular-on-nginx django schema-spy weasyprint"}

# The routes for the project
export routes=${routes:-"angular-on-nginx django schema-spy"}
