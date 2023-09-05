pipeline{
    agent any
    stages{
        stage("verify tooling"){
            steps{
                sh '''
                sudo docker version
                sudo docker info
                sudo docker compose version
                sudo curl --version
                sudo jq --version 
            '''
            }

        }
    }
}