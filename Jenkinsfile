pipeline{
    agent any
    stages{
        stage("verify tooling"){
            steps{
                sh '''
                docker version
                docker info
                docker compose version
                curl --version
                jq --version 
            '''
            }
            } 
        stage("excutable docker"){
            steps{
                sh '''
                withDockerRegistry(credentialsId: 'docker-hub', toolName: 'docker', url: 'https://hub.docker.com/') 
                // some block
                docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d  --scale node-app=3
            '''
        }

        }
    }
    
}