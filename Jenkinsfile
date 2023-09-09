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
        stage('build') {
            steps {
                echo 'start build1'
                withCredentials([usernamePassword(credentialsId: 'mshams1', usernameVariable: 'user', passwordVariable: 'password')]) {
                echo 'start build2'
                // sh 'docker build -t mshams1/node-app .'
                sh 'docker-compose -f docker-compose.yml -f docker-compose.dev.yml  --build'
                
                echo 'start build3' 
                sh "docker login -u $user -p $password"
                sh 'docker push mshams1/node-app'
              }
            }
        }
        stage("excute docker"){
            steps{
                sh '''
                docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d  --scale node-app=3
            '''
        }

        }
    }
    
}