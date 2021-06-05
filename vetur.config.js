module.exports = {    
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": true
    },
    
    projects: [
      './web', 
      {        
        root: './web',       
        package: './web/package.json',        
        tsconfig: './web/tsconfig.json',               
        globalComponents: [
          './web/src/components/**/*.vue'
        ]
      }
    ]
  }